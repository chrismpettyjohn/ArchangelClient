import { Button, Flex, Text } from "../../../../common";
import { FaCaretLeft } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useMessageEvent, useSessionInfo } from "../../../../hooks";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";
import { useCallback } from "react";
import { CorpDTO, CorpEditor } from "../corp-profile-edit/corp-editor/CorpEditor";
import { CorpCreateComposer } from "@nitro-rp/renderer/src/nitro/communication/messages/outgoing/roleplay/corp/CorpCreateComposer";
import { CorpInfoQueryEvent } from "@nitro-rp/renderer";

export function CorpProfileCreate() {
    const session = useSessionInfo();
    const { active, onHide } = useCommunityLinkTracker('corps', 'profile-create');
    const permissions = useRoleplayPermissions();

    const onSaveChanges = useCallback((dto: CorpDTO) => {
        SendMessageComposer(new CorpCreateComposer(dto.displayName, dto.description, '', dto.roomID, dto.userID, dto.sector, dto.industry));
    }, []);

    useMessageEvent(CorpInfoQueryEvent, () => {
        onHide();
    });

    if (!active || !permissions.canEditAllCorps) {
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
            <Text fontSize={3} variant="white">Creating Corp:</Text>
            <CorpEditor onSave={onSaveChanges} />
        </CommunityLayout >
    );
}
