import { useGangData } from "../../../../hooks/roleplay/use-gang-data";
import { Button, Column, Flex, Grid, LayoutAvatarImageView, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";
import { FaCaretLeft, FaCaretRight, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { useSessionInfo } from "../../../../hooks";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";
import { useMemo } from "react";


export function GangProfile() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('gangs', 'profile');
    const gang = useGangData(resourceID);
    const permissions = useRoleplayPermissions();

    const roleEmployees = []

    const canEditGang = useMemo(() => {
        return session?.userInfo?.userId === gang.userID || permissions.canEditAllGangs
    }, [gang, permissions]);

    if (!active) {
        return null;
    }

    return (
        <CommunityLayout tab="gangs" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent('community/gangs/list')}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
                {
                    canEditGang && (
                        <Button variant="success" onClick={() => CreateLinkEvent(`community/gangs/profile-edit/${gang.id}`)}>
                            <FaPencilAlt style={{ marginRight: 8 }} />
                            Edit Gang
                        </Button>
                    )
                }
            </Flex>
            <Grid fullHeight fullWidth gap={4}>
                <Column size={4} fullHeight fullWidth>
                    <div className="profile-card">
                        <div className="profile-header" style={{ backgroundImage: 'url(https://j.gifs.com/rR9pv4.gif)', backgroundSize: 'cover' }}>
                            <div className="overlay" />
                            <div className="avatar-placeholder" style={{ display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                <img src="https://i.imgur.com/5Id8akw.png" />
                            </div>
                            <p>{gang.name}</p>
                        </div>

                        <div className="profile-details">
                            <p><strong>Founded:</strong> <i>10/30/2024</i></p>
                            <p><strong>Owned By:</strong> <i>{gang.userID}</i></p>
                        </div>

                        <div className="profile-footer">
                            <div className="level">
                                <strong>LEVEL</strong><br />
                                <Text fontSize={4}>1</Text>
                            </div>
                            <div className="friends">
                                <strong>MEMBERS</strong><br />
                                <Text fontSize={4}>1</Text>
                            </div>
                        </div>
                    </div>
                </Column>
                <Column size={8} fullHeight gap={4}>
                    <NitroCardAccordionView fullHeight overflow="hidden">
                        <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                            <NitroCardAccordionSetView headerText="Member" isExpanded>
                                {
                                    roleEmployees.map(employee => (
                                        <li
                                            key={`employee_${employee.userID}`}
                                            onClick={() => CreateLinkEvent(`community/gangs/profile/${gang.userID}`)}
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
                        </ul>
                    </NitroCardAccordionView>
                </Column>
            </Grid>
        </CommunityLayout>
    );
}
