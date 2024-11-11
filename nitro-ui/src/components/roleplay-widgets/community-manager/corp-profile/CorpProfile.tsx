import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { Button, Column, Flex, Grid, LayoutAvatarImageView, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";
import { FaCaretLeft, FaCaretRight, FaPencilAlt } from "react-icons/fa";
import { AddEventLinkTracker, CreateLinkEvent, RemoveLinkEventTracker } from "../../../../api";
import { useCorpEmployeeList } from "../../../../hooks/roleplay/use-corp-employee-list";
import { CorpSector, ILinkEventTracker } from "@nitro-rp/renderer";
import { useCorpPositionList } from "../../../../hooks/roleplay/use-corp-position-list";
import { useSessionInfo } from "../../../../hooks";
import { CommunityLayout } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useEffect, useState } from "react";


export function CorpProfile() {
    const [corpID, setCorpID] = useState<number>();
    const session = useSessionInfo();
    const corp = useCorpData(corpID);
    const roles = useCorpPositionList(corpID);
    const employees = useCorpEmployeeList(corpID);

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');
                if (parts.length < 3) {
                    if (corpID) setCorpID(undefined);
                    return;
                }
                setCorpID(Number(parts[2]));
            },
            eventUrlPrefix: 'corps/profile'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    if (!corpID) {
        return null;
    }

    return (
        <CommunityLayout tab="corps" onClose={() => setCorpID(undefined)}>
            <Grid fullHeight fullWidth gap={4}>
                <Column size={4} fullHeight fullWidth>
                    <Flex justifyContent="between">
                        <Button variant="secondary" onClick={() => CreateLinkEvent('corps/list')}>
                            <FaCaretLeft style={{ marginRight: 8 }} />
                            Go back
                        </Button>
                        {
                            corp.userID === session?.userInfo?.userId && (
                                <Button variant="success" onClick={() => CreateLinkEvent('corps/list')}>
                                    <FaPencilAlt style={{ marginRight: 8 }} />
                                    Edit Corp
                                </Button>
                            )
                        }
                    </Flex>
                    <div className="profile-card">
                        <div className="profile-header" style={{ backgroundImage: 'url(https://j.gifs.com/rR9pv4.gif)', backgroundSize: 'cover' }}>
                            <div className="overlay" />
                            <div className="avatar-placeholder" style={{ display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                <img src="https://i.imgur.com/5Id8akw.png" />
                            </div>
                            <p>{corp.name}</p>
                        </div>

                        <div className="profile-details">
                            <p><strong>Founded:</strong> <i>10/30/2024</i></p>
                            <p><strong>Owned By:</strong> <i>{corp.userName}</i></p>
                            <p className="status">{corp.sector === CorpSector.Government ? 'Government' : 'Privately owned'}</p>
                        </div>

                        <div className="profile-footer">
                            <div className="level">
                                <strong>LEVEL</strong><br />
                                <Text fontSize={4}>1</Text>
                            </div>
                            <div className="friends">
                                <strong>EMPLOYEES</strong><br />
                                <Text fontSize={4}>{corp.employeeCount}</Text>
                            </div>
                        </div>
                    </div>
                </Column>
                <Column size={8} fullHeight gap={4}>
                    <NitroCardAccordionView fullHeight overflow="hidden">
                        <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                            {
                                roles.map(role => {
                                    const roleEmployees = employees.filter(_ => _.corpPositionID === role.id);
                                    return (
                                        <NitroCardAccordionSetView key={`role_${role.id}`} headerText={role.name} isExpanded>
                                            {
                                                roleEmployees.map(employee => (
                                                    <li
                                                        key={`employee_${employee.userID}`}
                                                        onClick={() => CreateLinkEvent(`users/${corp.userID}`)}
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            padding: "10px",
                                                            borderBottom: "1px solid #ccc",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <LayoutAvatarImageView figure={employee.figure} style={{ width: "45px", height: "45px", marginRight: "10px", }} />
                                                        <div style={{ flexGrow: 1 }}>
                                                            <div style={{ fontWeight: "bold" }}>{employee.username}</div>
                                                            <div><b className="mr-2">Since:</b> 11-01-2024</div>
                                                        </div>
                                                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                                                            <FaCaretRight />
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                            {
                                                !roleEmployees.length && <Text variant="white" fontSize={6}>This role is empty</Text>
                                            }
                                        </NitroCardAccordionSetView>
                                    )
                                })
                            }
                        </ul>
                    </NitroCardAccordionView>
                </Column>
            </Grid>
        </CommunityLayout>
    );
}
