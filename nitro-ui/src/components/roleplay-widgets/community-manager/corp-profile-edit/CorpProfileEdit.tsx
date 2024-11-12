import { Button, Flex, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useSessionInfo } from "../../../../hooks";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";
import { useCallback } from "react";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { CorpDTO, CorpEditor } from "./corp-editor/CorpEditor";
import { useCorpPositionList } from "../../../../hooks/roleplay/use-corp-position-list";

export function CorpProfileEdit() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('corps', 'profile-edit');
    const corp = useCorpData(resourceID);
    const permissions = useRoleplayPermissions();
    const positions = useCorpPositionList(resourceID);

    const onSaveChanges = useCallback((dto: CorpDTO) => {
        console.log('woo')
    }, []);


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
            </Flex>
            <NitroCardAccordionView fullHeight overflow="hidden">
                <NitroCardAccordionSetView headerText="Information">
                    <Text fontSize={3} variant="white">Editing: <b>#{corp.id} {corp.displayName}</b></Text>
                    <CorpEditor defaultCorp={corp} onSave={onSaveChanges} />
                </NitroCardAccordionSetView>
                <NitroCardAccordionSetView headerText="Positions">
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
            </NitroCardAccordionView>
        </CommunityLayout >
    );
}
