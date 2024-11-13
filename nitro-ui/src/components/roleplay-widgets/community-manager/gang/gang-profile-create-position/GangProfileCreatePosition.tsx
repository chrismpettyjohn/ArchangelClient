import { Button, Flex, Text } from "../../../../../common";
import { FaCaretLeft } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useCallback } from "react";
import { GangPositionDTO, GangPositionEditor } from "../gang-profile-edit/gang-position-editor/GangPositionEditor";
import { useRoleplayPermissions } from "../../../../../hooks/roleplay/use-roleplay-permissions";
import { GangRoleCreateComposer } from "@nitro-rp/renderer";

export function GangProfileCreatePosition() {
    const { active, resourceID, onHide } = useCommunityLinkTracker('gangs', 'profile-position-create');
    const permissions = useRoleplayPermissions()

    const canEditGang = permissions.canEditAllGangs;

    const onSaveChanges = useCallback((dto: GangPositionDTO) => {
        if (!resourceID || !canEditGang) {
            return;
        }
        SendMessageComposer(new GangRoleCreateComposer(resourceID, dto.orderID, dto.displayName, dto.canInvite, dto.canKick));
    }, [resourceID, canEditGang]);

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
