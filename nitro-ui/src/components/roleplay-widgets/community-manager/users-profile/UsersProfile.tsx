import { Button, Column, Flex, Grid, LayoutAvatarImageView, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../common";
import { FaCaretLeft, FaCaretRight, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useRoleplayStats } from "../../../../hooks/roleplay/use-rp-stats";
import { useSessionInfo } from "../../../../hooks";


export function UserProfile() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('users', 'profile');
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
                            Edit User
                        </Button>
                    )
                }
            </Flex>
            <Grid fullHeight fullWidth gap={4}>
                <Column size={4} fullHeight fullWidth>
                    <div className="profile-card">
                        <div className="profile-header" style={{ backgroundImage: 'url(https://j.gifs.com/rR9pv4.gif)', backgroundSize: 'cover' }}>
                            <div className="overlay" />
                            <div className="avatar-placeholder" style={{ display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                <img src="https://i.imgur.com/5Id8akw.png" />
                            </div>
                            <p>{rpStats.username}</p>
                        </div>

                        <div className="profile-details">
                            <p><strong>Last Online:</strong> <i>10/30/2024</i></p>
                            <p><strong>Joined:</strong> <i>10/30/2024</i></p>
                            <p>{rpStats.corporationPositionID} @ {rpStats.corporationID}</p>
                        </div>

                        <div className="profile-footer">
                            <div className="level">
                                <strong>LEVEL</strong><br />
                                <Text fontSize={4}>1</Text>
                            </div>
                            <div className="friends">
                                <strong>FACTION</strong><br />
                                <Text fontSize={4}>Gang</Text>
                            </div>
                        </div>
                    </div>
                </Column>
                <Column size={8} fullHeight gap={4}>
                    <NitroCardAccordionView fullHeight overflow="hidden">
                        <NitroCardAccordionSetView headerText="Skills" isExpanded>Skills</NitroCardAccordionSetView>
                        <NitroCardAccordionSetView headerText="Properties">Properties</NitroCardAccordionSetView>
                        <NitroCardAccordionSetView headerText="Armory">Armory</NitroCardAccordionSetView>
                    </NitroCardAccordionView>
                </Column>
            </Grid>
        </CommunityLayout >
    );
}
