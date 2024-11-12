import { Button, Flex, Text } from "../../../../common";
import { FaCaretLeft } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useCallback } from "react";
import { CorpPositionDTO, CorpPositionEditor } from "../corp-profile-edit/corp-position-editor/CorpPositionEditor";
import { CorpCreatePositionComposer } from "@nitro-rp/renderer";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";

export function CorpProfileCreatePosition() {
    const { active, resourceID, onHide } = useCommunityLinkTracker('corps', 'profile-position-create');
    const permissions = useRoleplayPermissions()

    const canEditCorp = permissions.canEditAllCorps;

    const onSaveChanges = useCallback((dto: CorpPositionDTO) => {
        if (!resourceID || !canEditCorp) {
            return;
        }
        SendMessageComposer(new CorpCreatePositionComposer(resourceID, dto.orderID, dto.displayName, dto.description, dto.salary, dto.maleFigure, dto.femaleFigure, dto.canHire, dto.canFire, dto.canPromote, dto.canDemote, dto.canWorkAnywhere));
    }, [resourceID, canEditCorp]);

    console.log({ active, resourceID, canEditCorp })
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
