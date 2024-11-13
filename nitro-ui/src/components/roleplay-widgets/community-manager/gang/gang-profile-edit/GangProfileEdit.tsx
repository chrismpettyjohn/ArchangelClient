import { Button, Flex, LayoutAvatarImageView, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../../common";
import { FaCaretLeft, FaCaretRight, FaPlusSquare, FaTimes } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useSessionInfo } from "../../../../../hooks";
import { useRoleplayPermissions } from "../../../../../hooks/roleplay/use-roleplay-permissions";
import { useCallback } from "react";
import { useGangData } from "../../../../../hooks/roleplay/use-gang-data";
import { GangDTO, GangEditor } from "./gang-editor/GangEditor";
import { useGangRoleList } from "../../../../../hooks/roleplay/use-gang-role-list";
import { useGangMembers } from "../../../../../hooks/roleplay/use-gang-members-list";
import { GangDeleteComposer, GangMemberKickComposer, GangUpdateComposer } from "@nitro-rp/renderer";

export function GangProfileEdit() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('gangs', 'profile-edit');
    const gang = useGangData(resourceID);
    const permissions = useRoleplayPermissions();
    const positions = useGangRoleList(resourceID);
    const members = useGangMembers(resourceID);

    const canEditGang = gang.id === session?.userInfo?.userId || permissions.canEditAllGangs;

    const onSaveChanges = useCallback((dto: GangDTO) => {
        SendMessageComposer(new GangUpdateComposer(resourceID, dto.displayName, dto.description, dto.badgeCode, dto.userID, dto.roomID))
    }, []);

    const onDeleteGang = useCallback(() => {
        SendMessageComposer(new GangDeleteComposer(resourceID))
        CreateLinkEvent('community/gangs/list');
    }, [resourceID]);

    const onFireUser = useCallback((username: string) => {
        SendMessageComposer(new GangMemberKickComposer(resourceID, username));
    }, []);

    if (!active || !canEditGang) {
        return null;
    }

    return (
        <CommunityLayout tab="gangs" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent(`community/gangs/profile/${resourceID}`)}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
            </Flex>
            <NitroCardAccordionView fullHeight overflow="hidden">
                <NitroCardAccordionSetView headerText="Information">
                    <Text fontSize={3} variant="white">Editing: <b>#{gang.id} {gang.displayName}</b></Text>
                    <GangEditor defaultGang={gang} onSave={onSaveChanges} />
                </NitroCardAccordionSetView>
                <NitroCardAccordionSetView headerText="Positions">
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                        <Button variant="primary" onClick={() => CreateLinkEvent(`community/gangs/profile-position-create/${resourceID}`)}>
                            <FaPlusSquare style={{ marginRight: 8 }} />
                            Add
                        </Button>
                    </div>
                    <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                        {positions.map((position) => (
                            <li
                                key={`position${position.id}`}
                                onClick={() => CreateLinkEvent(`community/gangs/profile-position-edit/${position.id}`)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src="https://www.habborator.org/badges/badges/HBA.gif"
                                    alt={`${gang.displayName} badge`}
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        marginRight: "10px",
                                    }}
                                />
                                <div style={{ flexGrow: 1 }}>
                                    <div style={{ fontWeight: "bold" }}>{position.displayName}</div>
                                    <div>Employees: {position.memberCount}</div>
                                </div>
                                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                                    <FaCaretRight />
                                </div>
                            </li>
                        ))}
                    </ul>
                    {
                        !positions.length && (
                            <p>No positions found</p>
                        )
                    }
                </NitroCardAccordionSetView>
                <NitroCardAccordionSetView headerText="Members">
                    <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                        {members.map((member) => (
                            <li
                                key={`members_${member.userId}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px",
                                    borderBottom: "1px solid #ccc",
                                    cursor: "pointer",
                                }}
                            >
                                <LayoutAvatarImageView figure={member.userLook} style={{ width: "45px", height: "45px", marginRight: "10px", }} />
                                <div style={{ flexGrow: 1 }}>
                                    <div style={{ fontWeight: "bold" }}>{member.userName}</div>
                                    <div>{member.roleName}</div>
                                </div>
                                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                                    <Button variant="danger" onClick={() => onFireUser(member.userName)}>
                                        <FaTimes style={{ marginRight: 8 }} />
                                        Fire
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {
                        !members.length && (
                            <p>No members found</p>
                        )
                    }
                </NitroCardAccordionSetView>
                {
                    gang.userID == session?.userInfo?.userId && (
                        <NitroCardAccordionSetView headerText="Delete">
                            <Text bold fontSize={4} variant="white">Are you sure?</Text>
                            <Text fontSize={5} variant="white">You're about to lay remove <strong>{gang.memberCount} jobs</strong> from the community</Text>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                                <Button variant="danger" onClick={onDeleteGang}>
                                    delete gang forever
                                </Button>
                            </div>
                        </NitroCardAccordionSetView>
                    )
                }
            </NitroCardAccordionView>
        </CommunityLayout >
    );
}
