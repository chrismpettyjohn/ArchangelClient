import { Button, Flex, Text } from "../../../../../common";
import { FaCaretLeft } from "react-icons/fa";
import { CreateLinkEvent, NotificationBubbleType, SendMessageComposer } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useMessageEvent, useNotification } from "../../../../../hooks";
import { useRoleplayPermissions } from "../../../../../hooks/roleplay/use-roleplay-permissions";
import { useCallback } from "react";
import { GangDTO, GangEditor } from "../gang-profile-edit/gang-editor/GangEditor";
import { GangCreateComposer } from "@nitro-rp/renderer/src/nitro/communication/messages/outgoing/roleplay/gang/GangCreateComposer";
import { GangQueryOneEvent } from "@nitro-rp/renderer";

export function GangProfileCreate() {
    const { showSingleBubble } = useNotification()
    const { active, onHide } = useCommunityLinkTracker('gangs', 'profile-create');
    const permissions = useRoleplayPermissions();

    const onSaveChanges = useCallback((dto: GangDTO) => {
        SendMessageComposer(new GangCreateComposer(dto.displayName, dto.description, '', dto.userID, dto.roomID));
    }, []);

    useMessageEvent(GangQueryOneEvent, (event: GangQueryOneEvent) => {
        if (!active) return;
        showSingleBubble(`${event.getParser().gang.displayName} was created`, NotificationBubbleType.INFO)
        CreateLinkEvent(`community/gangs/profile-edit/${event.getParser().gang.id}`);
    });

    if (!active || !permissions.canEditAllGangs) {
        return null;
    }

    return (
        <CommunityLayout tab="gangs" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent('community/gangs/list')}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
            </Flex>
            <Text fontSize={3} variant="white">Creating Gang:</Text>
            <GangEditor onSave={onSaveChanges} />
        </CommunityLayout >
    );
}
