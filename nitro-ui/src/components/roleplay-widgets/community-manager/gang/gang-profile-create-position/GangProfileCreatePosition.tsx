import { Button, Flex, Text } from "../../../../../common";
import { FaCaretLeft } from "react-icons/fa";
import { CreateLinkEvent, NotificationBubbleType, SendMessageComposer } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useCallback } from "react";
import { GangPositionDTO, GangPositionEditor } from "../gang-profile-edit/gang-position-editor/GangPositionEditor";
import { useRoleplayPermissions } from "../../../../../hooks/roleplay/use-roleplay-permissions";
import { GangRoleCreateComposer, GangRoleQueryOneEvent } from "@nitro-rp/renderer";
import { useMessageEvent, useNotification } from "../../../../../hooks";

export function GangProfileCreatePosition() {
    const { showSingleBubble } = useNotification()
    const { active, resourceID, onHide } = useCommunityLinkTracker('gangs', 'profile-position-create');
    const permissions = useRoleplayPermissions()

    const canEditGang = permissions.canEditAllGangs;

    const onSaveChanges = useCallback((dto: GangPositionDTO) => {
        if (!resourceID || !canEditGang) {
            return;
        }
        SendMessageComposer(new GangRoleCreateComposer(resourceID, dto.displayName, dto.canInvite, dto.canKick));
    }, [resourceID, canEditGang]);

    useMessageEvent(GangRoleQueryOneEvent, (event: GangRoleQueryOneEvent) => {
        if (!active) return;
        showSingleBubble(`${event.getParser().role.displayName} was created`, NotificationBubbleType.INFO)
        CreateLinkEvent(`community/gangs/profile-position-edit/${event.getParser().role.id}`)
    })

    if (!active || !resourceID || !canEditGang) {
        return null;
    }

    return (
        <CommunityLayout tab="gangs" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent(`community/gangs/profile-edit/${resourceID}`)}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
            </Flex>
            <Text fontSize={3} variant="white">Creating Position:</Text>
            <br /><br />
            <GangPositionEditor onSave={onSaveChanges} />
        </CommunityLayout >
    );
}
