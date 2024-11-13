import { Button, Flex } from "../../../../../common";
import { FaCaretLeft, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useRoleplayStats } from "../../../../../hooks/roleplay/use-rp-stats";
import { useSessionInfo } from "../../../../../hooks";

export function UserProfileEditor() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('users', 'profile-edit');
    const rpStats = useRoleplayStats(resourceID);

    if (!active) {
        return null;
    }

    return (
        <CommunityLayout tab="users" onClose={onHide}>
            <Flex className="mb-4" fullWidth justifyContent="between">
                <Button variant="secondary" onClick={() => CreateLinkEvent('community/users/list')}>
                    <FaCaretLeft style={{ marginRight: 8 }} />
                    Go back
                </Button>
                {
                    rpStats.userID === session?.userInfo?.userId && (
                        <Button variant="success" onClick={() => CreateLinkEvent('community/users/list')}>
                            <FaPencilAlt style={{ marginRight: 8 }} />
                            Save Changes
                        </Button>
                    )
                }
            </Flex>
            woo
        </CommunityLayout>
    )
}