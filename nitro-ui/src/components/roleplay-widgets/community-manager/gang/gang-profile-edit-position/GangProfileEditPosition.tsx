import { Button, Flex, Text } from "../../../../../common";
import { FaCaretLeft } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useSessionInfo } from "../../../../../hooks";
import { useCallback } from "react";
import { GangPositionDTO, GangPositionEditor } from "../gang-profile-edit/gang-position-editor/GangPositionEditor";
import { useRoleplayPermissions } from "../../../../../hooks/roleplay/use-roleplay-permissions";
import { GangRoleUpdateComposer } from "@nitro-rp/renderer";
import { useGangRoleData } from "../../../../../hooks/roleplay/use-gang-role-data";

export function GangProfileEditPosition() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('gangs', 'profile-position-edit');
    const position = useGangRoleData(resourceID);
    const permissions = useRoleplayPermissions()

    const canEditGang = position?.id === session?.userInfo?.userId || permissions.canEditAllGangs;

    const onSaveChanges = useCallback((dto: GangPositionDTO) => {
        if (!position || !canEditGang) {
            return;
        }
        SendMessageComposer(new GangRoleUpdateComposer(position.id, position.orderId, dto.displayName, dto.canInvite, dto.canKick));
    }, [position, canEditGang]);

    if (!active || !position || !canEditGang) {
        return null;
    }

    return (
        <CommunityLayout tab="gangs" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent(`community/gangs/profile-edit/${position.gangId}`)}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
            </Flex>
            <Text fontSize={3} variant="white">Editing: <b>#{position.orderId} {position.displayName}</b></Text>
            <br /><br />
            <GangPositionEditor defaultGangPosition={position} onSave={onSaveChanges} />
        </CommunityLayout >
    );
}
