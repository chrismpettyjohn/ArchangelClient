import { Button, Flex, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";
import { FaCaretLeft, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useSessionInfo } from "../../../../hooks";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";
import { useCallback, useMemo } from "react";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";
import { CorpDTO, CorpEditor } from "./corp-editor/CorpEditor";

export function CorpProfileEdit() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('corps', 'profile-edit');
    const corp = useCorpData(resourceID);
    const permissions = useRoleplayPermissions();

    const onSaveChanges = useCallback((dto: CorpDTO) => {
        console.log('woo')
    }, []);

    console.log({ resourceID });


    if (!active || !resourceID) {
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
                <NitroCardAccordionSetView headerText="Information" isExpanded>
                    <Text variant="white">Editing: <b>#{corp.id} {corp.displayName}</b></Text>
                    <CorpEditor defaultCorp={corp} onSave={onSaveChanges} />
                </NitroCardAccordionSetView>
                <NitroCardAccordionSetView headerText="Positions">

                </NitroCardAccordionSetView>
            </NitroCardAccordionView>
        </CommunityLayout >
    );
}
