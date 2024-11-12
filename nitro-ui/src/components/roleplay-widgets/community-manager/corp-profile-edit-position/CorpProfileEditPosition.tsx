import { Button, Flex, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useSessionInfo } from "../../../../hooks";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";
import { useCallback } from "react";
import { useCorpPositionList } from "../../../../hooks/roleplay/use-corp-position-list";
import { CorpPositionDTO, CorpPositionEditor } from "../corp-profile-edit/corp-position-editor/CorpPositionEditor";
import { useCorpPositionData } from "../../../../hooks/roleplay/use-corp-position-data";

export function CorpProfileEditPosition() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('corps', 'profile-position-edit');
    const position = useCorpPositionData(resourceID);
    const permissions = useRoleplayPermissions();
    const positions = useCorpPositionList(resourceID);

    const onSaveChanges = useCallback((dto: CorpPositionDTO) => {
        console.log('woo')
    }, []);


    if (!active) {
        return null;
    }

    return (
        <CommunityLayout tab="corps" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent(`community/corps/profile-edit/${position.corpID}`)}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
            </Flex>
            <Text variant="white">Editing: <b>#{position.id} {position.displayName}</b></Text>
            <CorpPositionEditor defaultCorpPosition={position} onSave={onSaveChanges} />
        </CommunityLayout >
    );
}
