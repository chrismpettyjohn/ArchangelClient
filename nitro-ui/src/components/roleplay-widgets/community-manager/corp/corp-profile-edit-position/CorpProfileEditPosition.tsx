import { Button, Flex, Text } from "../../../../../common";
import { FaCaretLeft } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useSessionInfo } from "../../../../../hooks";
import { useCallback } from "react";
import { CorpPositionDTO, CorpPositionEditor } from "../corp-profile-edit/corp-position-editor/CorpPositionEditor";
import { useCorpPositionData } from "../../../../../hooks/roleplay/use-corp-position-data";
import { CorpEditPositionComposer } from "@nitro-rp/renderer";
import { useRoleplayPermissions } from "../../../../../hooks/roleplay/use-roleplay-permissions";

export function CorpProfileEditPosition() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('corps', 'profile-position-edit');
    const position = useCorpPositionData(resourceID);
    const permissions = useRoleplayPermissions()

    const canEditCorp = position?.id === session?.userInfo?.userId || permissions.canEditAllCorps;

    const onSaveChanges = useCallback((dto: CorpPositionDTO) => {
        if (!position || !canEditCorp) {
            return;
        }
        SendMessageComposer(new CorpEditPositionComposer(position.corpID, position.id, position.orderID, dto.displayName, dto.description, dto.salary, dto.maleFigure, dto.femaleFigure, dto.canHire, dto.canFire, dto.canPromote, dto.canDemote, dto.canWorkAnywhere));
    }, [position, canEditCorp]);

    if (!active || !position || !canEditCorp) {
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
            <Text fontSize={3} variant="white">Editing: <b>#{position.orderID} {position.displayName}</b></Text>
            <br /><br />
            <CorpPositionEditor defaultCorpPosition={position} onSave={onSaveChanges} />
        </CommunityLayout >
    );
}
