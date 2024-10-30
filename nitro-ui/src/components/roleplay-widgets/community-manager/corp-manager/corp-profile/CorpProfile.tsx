import { useCorpData } from "../../../../../hooks/roleplay/use-corp-data";
import { useRoleplayStats } from "../../../../../hooks/roleplay/use-rp-stats";
import { Button, Column, Flex, Grid, LayoutAvatarImageView, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../../common";
import { FaCaretLeft, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../../api";

interface CorpProfileProps {
    corpID: number;
}

export function CorpProfile({ corpID }: CorpProfileProps) {
    console.log({ corpID })
    const corp = useCorpData(corpID);
    const owner = useRoleplayStats(corp.userID);

    return (
        <Grid fullHeight fullWidth gap={4}>
            <Column size={4} fullHeight fullWidth>
                <Flex justifyContent="between">
                    <Button variant="secondary" onClick={() => CreateLinkEvent('users/show')}>
                        <FaCaretLeft style={{ marginRight: 8 }} />
                        Go back
                    </Button>
                    <Button variant="success" onClick={() => CreateLinkEvent('users/show')}>
                        <FaPencilAlt style={{ marginRight: 8 }} />
                        Edit Corp
                    </Button>
                </Flex>
                <div className="profile-card">
                    <div className="profile-header" style={{ backgroundImage: 'url(https://j.gifs.com/rR9pv4.gif)', backgroundSize: 'cover' }}>
                        <div className="overlay" />
                        <div className="avatar-placeholder" style={{ display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                            <img src="https://i.imgur.com/5Id8akw.png" />
                        </div>
                        <p>{corp.name}</p>
                    </div>

                    <div className="profile-details">
                        <p><strong>Founded:</strong> <i>10/30/2024</i></p>
                        <p><strong>Owned By:</strong> <i>LeChris</i></p>
                        <p className="status">Privately Owned</p>
                    </div>

                    <div className="profile-footer">
                        <div className="level">
                            <strong>LEVEL</strong><br />
                            <Text fontSize={4}>1</Text>
                        </div>
                        <div className="friends">
                            <strong>EMPLOYEES</strong><br />
                            <Text fontSize={4}>4/20</Text>
                        </div>
                    </div>
                </div>
            </Column>
            <Column size={8} fullHeight gap={4}>
                <NitroCardAccordionView fullHeight overflow="hidden">
                    <NitroCardAccordionSetView headerText="Chief of Police" isExpanded>
                        bob
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Sergeant">
                        jenny and ross
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Detective">
                        joey
                    </NitroCardAccordionSetView>
                    <NitroCardAccordionSetView headerText="Street cop">
                        a lot of sad people
                    </NitroCardAccordionSetView>
                </NitroCardAccordionView>
            </Column>
        </Grid>
    );
}
