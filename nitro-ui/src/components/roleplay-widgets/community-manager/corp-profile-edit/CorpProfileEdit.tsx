import { Button, Flex } from "../../../../common";
import { FaCaretLeft, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useSessionInfo } from "../../../../hooks";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";
import { useCallback, useMemo } from "react";
import { useCorpData } from "../../../../hooks/roleplay/use-corp-data";

export function CorpProfileEdit() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('corps', 'profile-edit');
    const corp = useCorpData(resourceID);
    const permissions = useRoleplayPermissions();

    const canEditCorp = useMemo(() => {
        return session?.userInfo?.userId === corp.userID || permissions.canEditAllCorps
    }, [corp, permissions]);

    const onSaveChanges = useCallback(() => {

    }, []);


    if (!active) {
        return null;
    }

    return (
        <CommunityLayout tab="corps" onClose={onHide}>
            <form onSubmit={onSaveChanges}>
                <Flex className="mb-4" fullWidth justifyContent="between">
                    <Button variant="secondary" onClick={() => CreateLinkEvent('community/corps/list')}>
                        <FaCaretLeft style={{ marginRight: 8 }} />
                        Go back
                    </Button>
                    {
                        canEditCorp && (
                            <Button variant="success" onClick={onSaveChanges}>
                                <FaPencilAlt style={{ marginRight: 8 }} />
                                Save Changes
                            </Button>
                        )
                    }
                </Flex>
            </form>
        </CommunityLayout >
    );
}
