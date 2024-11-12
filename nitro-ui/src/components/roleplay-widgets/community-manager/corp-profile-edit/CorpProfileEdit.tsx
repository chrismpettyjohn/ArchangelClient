import { Button, Flex, LayoutAvatarImageView, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";
import { FaCaretLeft, FaCaretRight, FaFire, FaPlusSquare, FaTimes } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useSessionInfo } from "../../../../hooks";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";
import { useCallback } from "react";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { CorpDTO, CorpEditor } from "./corp-editor/CorpEditor";
import { useCorpPositionList } from "../../../../hooks/roleplay/use-corp-position-list";
import { CorpDeleteComposer, CorpEditComposer, CorpFireUserComposer } from "@nitro-rp/renderer";
import { useCorpEmployeeList } from "../../../../hooks/roleplay/use-corp-employee-list";

export function CorpProfileEdit() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('corps', 'profile-edit');
    const corp = useCorpData(resourceID);
    const permissions = useRoleplayPermissions();
    const positions = useCorpPositionList(resourceID);
    const employees = useCorpEmployeeList(resourceID);

    const canEditCorp = corp.id === session?.userInfo?.userId || permissions.canEditAllCorps;

    const onSaveChanges = useCallback((dto: CorpDTO) => {
        SendMessageComposer(new CorpEditComposer(resourceID, dto.displayName, dto.description, dto.userID, dto.roomID, dto.sector, dto.industry))
    }, []);

    const onDeleteCorp = useCallback(() => {
        SendMessageComposer(new CorpDeleteComposer(resourceID))
        CreateLinkEvent('community/corps/list');
    }, [resourceID]);

    const onFireUser = useCallback((username: string) => {
        SendMessageComposer(new CorpFireUserComposer(username));
    }, []);

    if (!active || !canEditCorp) {
        return null;
    }

    return (
        <CommunityLayout tab="corps" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent(`community/corps/profile/${resourceID}`)}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
            </Flex>
            <NitroCardAccordionView fullHeight overflow="hidden">
                <NitroCardAccordionSetView headerText="Information">
                    <Text fontSize={3} variant="white">Editing: <b>#{corp.id} {corp.displayName}</b></Text>
                    <CorpEditor defaultCorp={corp} onSave={onSaveChanges} />
                </NitroCardAccordionSetView>
                <NitroCardAccordionSetView headerText="Positions">
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                        <Button variant="primary" onClick={() => CreateLinkEvent(`community/corps/profile-position-create/${resourceID}`)}>
                            <FaPlusSquare style={{ marginRight: 8 }} />
                            Add
                        </Button>
                    </div>
                    <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                        {positions.map((position) => (
                            <li
                                key={`position${position.id}`}
                                onClick={() => CreateLinkEvent(`community/corps/profile-position-edit/${position.id}`)}
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
                                    alt={`${corp.displayName} badge`}
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        marginRight: "10px",
                                    }}
                                />
                                <div style={{ flexGrow: 1 }}>
                                    <div style={{ fontWeight: "bold" }}>{position.name}</div>
                                    <div>Employees: {position.employeeCount}</div>
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
                <NitroCardAccordionSetView headerText="Employees">
                    <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                        {employees.map((employee) => (
                            <li
                                key={`employees_${employee.userID}`}
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
                                    <div>{employee.corpPositionName}</div>
                                </div>
                                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                                    <Button variant="danger" onClick={() => onFireUser(employee.username)}>
                                        <FaTimes style={{ marginRight: 8 }} />
                                        Fire
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {
                        !employees.length && (
                            <p>No employees found</p>
                        )
                    }
                </NitroCardAccordionSetView>
                {
                    corp.userID == session?.userInfo?.userId && (
                        <NitroCardAccordionSetView headerText="Delete">
                            <Text bold fontSize={4} variant="white">Are you sure?</Text>
                            <Text fontSize={5} variant="white">You're about to lay remove <strong>{corp.employeeCount} jobs</strong> from the community</Text>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                                <Button variant="danger" onClick={onDeleteCorp}>
                                    delete corp forever
                                </Button>
                            </div>
                        </NitroCardAccordionSetView>
                    )
                }
            </NitroCardAccordionView>
        </CommunityLayout >
    );
}
