import { Button, Column, Flex, Grid, NitroCardAccordionSetView, NitroCardAccordionView, Text } from "../../../../../common";
import { FaTree, FaFistRaised, FaCrosshairs, FaSeedling, FaGem, FaHeart, FaCaretLeft, FaPencilAlt } from 'react-icons/fa';
import { CreateLinkEvent } from "../../../../../api";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { _setVisible } from "ag-grid-community";
import { useRoleplayStats } from "../../../../../hooks/roleplay/use-rp-stats";
import { useSessionInfo } from "../../../../../hooks";
import { usePlayerSkills } from "../../../../../hooks/roleplay/use-player-skills";
import { useMemo } from "react";
import { UserGuestbook } from "./user-guestbook/UserGuestbook";
import { useProfileBanner } from "../../../../../hooks/roleplay/user-profile-banner";


export function UserProfile() {
    const session = useSessionInfo();
    const { active, resourceID, onHide } = useCommunityLinkTracker('users', 'profile');
    const rpStats = useRoleplayStats(resourceID);
    const rpSkills = usePlayerSkills(resourceID);
    const banner = useProfileBanner(resourceID);

    console.log({ banner })

    const skills = useMemo(() => {
        return [
            {
                name: 'Strength',
                level: rpSkills.strengthLevel,
                icon: <FaFistRaised />,
            },
            {
                name: 'Lumberjack',
                level: rpSkills.lumberjackLevel,
                icon: <FaTree />,
            },
            {
                name: 'Melee',
                level: rpSkills.meleeLevel,
                icon: <FaFistRaised />,
            },
            {
                name: 'Weapon',
                level: rpSkills.weaponLevel,
                icon: <FaCrosshairs />,
            },
            {
                name: 'Farming',
                level: rpSkills.farmingLevel,
                icon: <FaSeedling />,
            },
            {
                name: 'Mining',
                level: rpSkills.miningLevel,
                icon: <FaGem />,
            },
            {
                name: 'Stamina',
                level: rpSkills.staminaLevel,
                icon: <FaHeart />,
            },
        ];
    }, [rpSkills]);


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
                        <Button variant="success" onClick={() => CreateLinkEvent(`community/users/profile-edit/${rpStats.userID}`)}>
                            <FaPencilAlt style={{ marginRight: 8 }} />
                            Edit Profile
                        </Button>
                    )
                }
            </Flex>
            <Grid fullHeight fullWidth gap={4}>
                <Column size={5} fullHeight fullWidth>
                    <div className="h-100 w-100">
                        <div className="profile-card" style={{ height: 'calc(100% - 55px)' }}>
                            <div className="profile-header" style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover' }}>
                                <div className="overlay" />
                                <div className="avatar-placeholder" style={{ display: 'flex', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="https://i.imgur.com/5Id8akw.png" />
                                </div>
                                <p>{rpStats.username}</p>
                            </div>
                            <div className="profile-details">
                                <Text variant="white" fontSize={6}><strong>Joined At: </strong>{new Date(rpStats.joinedAt * 1000).toLocaleDateString()}</Text>
                                <br />
                                <Text variant="white" fontSize={6}><strong>Last Login: </strong>{new Date(rpStats.lastLogin * 1000).toLocaleDateString()}</Text>
                                <br /><br />
                                <Text variant="white" fontSize={6}><strong>Employer: </strong>{rpStats.corpRoleName} @ {rpStats.corpName}</Text>
                                <br />
                                <Text variant="white" fontSize={6}><strong>Gang: </strong>{!!rpStats.gangRoleName ? (<>{rpStats.gangRoleName} @ {rpStats.gangName}</>) : 'N/A'}</Text>
                            </div>
                            <div className="profile-footer" style={{ flexDirection: 'column', height: 'fit-content' }}>
                                <div className="level w-100">
                                    <Text bold fontSize={5} variant="white">LEVEL</Text><br />
                                    <Text fontSize={6} variant="white">1</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </Column>
                <Column size={7} gap={4}>
                    <NitroCardAccordionView fullHeight overflow="hidden">
                        <NitroCardAccordionSetView headerText="Guestbook" isExpanded>
                            <UserGuestbook userId={resourceID} />
                        </NitroCardAccordionSetView>
                        <NitroCardAccordionSetView headerText="Skills">
                            <div className="skills-grid">
                                {skills.map((skill, index) => (
                                    <div key={index} className="skill-card">
                                        {skill.icon}
                                        <div className="skill-name">{skill.name}</div>
                                        <div className="skill-level">{skill.level}</div>
                                    </div>
                                ))}
                            </div>
                        </NitroCardAccordionSetView>
                        <NitroCardAccordionSetView headerText="Properties">Properties</NitroCardAccordionSetView>
                        <NitroCardAccordionSetView headerText="Armory">Armory</NitroCardAccordionSetView>
                    </NitroCardAccordionView>
                </Column>
            </Grid>
        </CommunityLayout >
    );
}
