import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { Button, Column, Flex, Grid, LayoutAvatarImageView, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";
import { FaCaretLeft, FaCaretRight, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { useCorpEmployeeList } from "../../../../hooks/roleplay/use-corp-employee-list";
import { useCorpPositionList } from "../../../../hooks/roleplay/use-corp-position-list";
import { useSessionInfo } from "../../../../hooks";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";
import { useMemo } from "react";


export function CorpProfile() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('corps', 'profile');
    const corp = useCorpData(resourceID);
    const roles = useCorpPositionList(resourceID);
    const employees = useCorpEmployeeList(resourceID);
    const permissions = useRoleplayPermissions();

    const canEditCorp = useMemo(() => {
        return session?.userInfo?.userId === corp.userID || permissions.canEditAllCorps
    }, [corp, permissions]);

    if (!active) {
        return null;
    }

    return (
        <CommunityLayout tab="corps" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent('community/corps/list')}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
                {
                    canEditCorp && (
                        <Button variant="success" onClick={() => CreateLinkEvent(`community/corps/profile-edit/${corp.id}`)}>
                            <FaPencilAlt style={{ marginRight: 8 }} />
                            Edit Corp
                        </Button>
                    )
                }
            </Flex>
            <Grid fullHeight fullWidth gap={4}>
                <Column size={4} fullHeight fullWidth>
                    <div>
                        <div className="profile-card" style={{ height: 350 }}>
                            <div className="profile-header" style={{ backgroundImage: 'url(https://j.gifs.com/rR9pv4.gif)', backgroundSize: 'cover' }}>
                                <div className="overlay" />
                                <div className="avatar-placeholder" style={{ display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="https://i.imgur.com/5Id8akw.png" />
                                </div>
                            </div>
                            <div className="profile-details" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <Text bold fontSize={4} variant="white">{corp.displayName}</Text>
                                <div>
                                    <Text bold variant="white">CEO</Text>
                                    <br />
                                    <Text variant="white">{corp.userName}</Text>
                                </div>
                                <div>
                                    <Text bold variant="white">Headquarters</Text>
                                    <br />
                                    <Text variant="white">{corp.roomName}</Text>
                                </div>
                                <div>
                                    <Text bold variant="white">Established</Text>
                                    <br />
                                    <Text variant="white">{corp.createdAt}</Text>
                                </div>
                            </div>
                            <div className="profile-footer">
                                <div className="friends w-100">
                                    <strong>EMPLOYEES</strong><br />
                                    <Text fontSize={4}>{corp.employeeCount + 1}</Text>
                                </div>
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
                                                        onClick={() => CreateLinkEvent(`community/users/profile/${employee.userID}`)}
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
