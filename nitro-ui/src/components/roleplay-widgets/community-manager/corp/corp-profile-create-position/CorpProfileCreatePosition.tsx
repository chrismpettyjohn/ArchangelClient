import { Button, Flex, Text } from "../../../../../common";
import { FaCaretLeft } from "react-icons/fa";
import { CreateLinkEvent, NotificationBubbleType, SendMessageComposer } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useCallback } from "react";
import { CorpPositionDTO, CorpPositionEditor } from "../corp-profile-edit/corp-position-editor/CorpPositionEditor";
import { CorpCreatePositionComposer, CorpPositionInfoQueryEvent } from "@nitro-rp/renderer";
import { useRoleplayPermissions } from "../../../../../hooks/roleplay/use-roleplay-permissions";
import { useMessageEvent, useNotification } from "../../../../../hooks";

export function CorpProfileCreatePosition() {
    const { showSingleBubble } = useNotification()
    const { active, resourceID, onHide } = useCommunityLinkTracker('corps', 'profile-position-create');
    const permissions = useRoleplayPermissions()

    const canEditCorp = permissions.canEditAllCorps;

    const onSaveChanges = useCallback((dto: CorpPositionDTO) => {
        if (!resourceID || !canEditCorp) {
            return;
        }
        SendMessageComposer(new CorpCreatePositionComposer(resourceID, dto.displayName, dto.description, dto.salary, dto.maleFigure, dto.femaleFigure, dto.canHire, dto.canFire, dto.canPromote, dto.canDemote, dto.canWorkAnywhere));
    }, [resourceID, canEditCorp, showSingleBubble]);

    useMessageEvent(CorpPositionInfoQueryEvent, (event: CorpPositionInfoQueryEvent) => {
        if (!active) return;
        showSingleBubble(`${event.getParser().data.displayName} was created`, NotificationBubbleType.INFO)
        CreateLinkEvent(`community/corps/profile-position-edit/${event.getParser().data.id}`)
    })

    if (!active || !resourceID || !canEditCorp) {
        return null;
    }

    return (
        <CommunityLayout tab="corps" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent(`community/corps/profile-edit/${resourceID}`)}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
            </Flex>
            <Text fontSize={3} variant="white">Creating Position:</Text>
            <br /><br />
            <CorpPositionEditor onSave={onSaveChanges} />
        </CommunityLayout >
    );
}
