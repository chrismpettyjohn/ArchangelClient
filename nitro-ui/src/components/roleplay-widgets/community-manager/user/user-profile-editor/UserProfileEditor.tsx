import { Button, Flex, Text } from "../../../../../common";
import { FaCaretLeft, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useRoleplayStats } from "../../../../../hooks/roleplay/use-rp-stats";
import { useSessionInfo } from "../../../../../hooks";
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useProfileBanner } from "../../../../../hooks/roleplay/user-profile-banner";
import { UserChangeProfileBannerComposer } from "@nitro-rp/renderer";

export function UserProfileEditor() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('users', 'profile-edit');
    const rpStats = useRoleplayStats(resourceID);
    const banner = useProfileBanner(resourceID);
    const [newBanner, setNewBanner] = useState(banner)

    useEffect(() => {
        setNewBanner(banner);
    }, [banner]);

    const onChangeBanner = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setNewBanner(event.currentTarget.value)
    }, [setNewBanner]);

    const onUpdateBanner = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        SendMessageComposer(new UserChangeProfileBannerComposer(newBanner))
    }, [newBanner]);

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
            </Flex>
            <form onSubmit={onUpdateBanner} style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 12 }}>
                <Text bold fontSize={4}>Profile Banner</Text>
                <Text fontSize={6}>imgur links only.  you can upload an image to imgur, right click and click "copy to address"</Text>
                <input className="form-input" value={newBanner} onChange={onChangeBanner} />
                {
                    rpStats.userID === session?.userInfo?.userId && (
                        <Button variant="success" onClick={onUpdateBanner}>
                            <FaPencilAlt style={{ marginRight: 8 }} />
                            Update Banner
                        </Button>
                    )
                }
            </form>
        </CommunityLayout>
    )
}