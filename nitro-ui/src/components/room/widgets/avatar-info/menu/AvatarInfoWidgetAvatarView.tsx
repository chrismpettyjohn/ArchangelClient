import { CorpIndustry, CreateStoreProductOfferComposer, RemoveFriendComposer, RequestFriendComposer, RoomObjectCategory, StoreProductType } from '@nitro-rp/renderer';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { AvatarInfoUser, GetUserProfile, LocalizeText, ProductTypeEnum, SendMessageComposer } from '../../../../../api';
import { useFriends, useSessionInfo } from '../../../../../hooks';
import { ContextMenuHeaderView } from '../../context-menu/ContextMenuHeaderView';
import { ContextMenuListItemView } from '../../context-menu/ContextMenuListItemView';
import { ContextMenuView } from '../../context-menu/ContextMenuView';
import { GangInviteUser } from '../../../../../api/roleplay/gang/GangInviteUser';
import { CorpDemoteUser } from '../../../../../api/roleplay/corp/CorpDemoteUser';
import { CorpPromoteUser } from '../../../../../api/roleplay/corp/CorpPromoteUser';
import { CorpFireUser } from '../../../../../api/roleplay/corp/CorpFireUser';
import { CorpOfferJob } from '../../../../../api/roleplay/corp/CorpOfferJob';
import { FaCaretLeft, FaChevronRight } from 'react-icons/fa';
import { useRoleplayStats } from '../../../../../hooks/roleplay/use-rp-stats';
import { PoliceArrestUser } from '../../../../../api/roleplay/police/PoliceArrestUser';
import { PoliceCuffUser } from '../../../../../api/roleplay/police/PoliceCuffUser';
import { PoliceStunUser } from '../../../../../api/roleplay/police/PoliceStunUser';
import { PoliceEscortUser } from '../../../../../api/roleplay/police/PoliceEscortUser';
import { useCrimes } from '../../../../../api/roleplay/police/GetCrimes';
import { useCorpData } from '../../../../../hooks/roleplay/use-corp-data';
import { useShiftInventory } from '../../../../../api/roleplay/store/GetShiftInventory';

interface AvatarInfoWidgetAvatarViewProps {
    avatarInfo: AvatarInfoUser;
    onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_WORK = 1;
const MODE_GANG = 2;
const MODE_POLICE = 3;
const MODE_ARREST = 4;
const MODE_SELL_WEAPONS = 5;
const MODE_SELL_AMMO = 6;

export const AvatarInfoWidgetAvatarView: FC<AvatarInfoWidgetAvatarViewProps> = props => {
    const { userInfo: sessionInfo } = useSessionInfo();
    const { avatarInfo = null, onClose = null } = props;
    const roleplayStats = useRoleplayStats(avatarInfo?.webID);
    const sessionRoleplayStats = useRoleplayStats(sessionInfo?.userId);
    const [mode, setMode] = useState(MODE_NORMAL);
    const { canRequestFriend = null, getFriend } = useFriends();
    const crimeList = useCrimes();
    const shiftInventory = useShiftInventory();

    const shiftWeapons = useMemo(() => shiftInventory.filter(_ => _.productType === StoreProductType.WEAPON), [shiftInventory]);
    const shiftAmmo = useMemo(() => shiftInventory.filter(_ => _.productType === StoreProductType.AMMO), [shiftInventory]);

    console.log({ shiftWeapons, shiftAmmo, shiftInventory })

    const myRoleplayStats = useRoleplayStats(sessionInfo?.userId)
    const myCorpData = useCorpData(myRoleplayStats.corporationID);

    const onSellProduct = useCallback((productId: number) => {
        SendMessageComposer(new CreateStoreProductOfferComposer(productId));
        onClose();
    }, []);


    const processAction = (name: string) => {
        let hideMenu = true;

        if (name) {
            switch (name) {
                case 'back':
                    hideMenu = false
                    setMode(MODE_NORMAL);
                    break;
                case 'view_business':
                    hideMenu = false
                    setMode(MODE_WORK);
                    break;
                case 'view_gang':
                    hideMenu = false
                    setMode(MODE_GANG);
                    break;
                case 'view_police':
                    hideMenu = false
                    setMode(MODE_POLICE);
                    break;
                case 'view_police_arrest':
                    hideMenu = false
                    setMode(MODE_ARREST);
                    break;
                case 'corp_offer_job':
                    CorpOfferJob(avatarInfo.name);
                    break;
                case 'corp_fire_user':
                    CorpFireUser(avatarInfo.name);
                    break;
                case 'corp_promote_user':
                    CorpPromoteUser(avatarInfo.name);
                    break;
                case 'corp_demote_user':
                    CorpDemoteUser(avatarInfo.name);
                    break;
                case 'gang_invite_user':
                    GangInviteUser(avatarInfo.name);
                    break;
                case 'police_stun':
                    hideMenu = false
                    PoliceStunUser(avatarInfo.name);
                    break;
                case 'police_cuff':
                    hideMenu = false
                    PoliceCuffUser(avatarInfo.name);
                    break;
                case 'police_escort':
                    hideMenu = false
                    PoliceEscortUser(avatarInfo.name);
                    break;
                case 'sell_weapons':
                    hideMenu = false;
                    setMode(MODE_SELL_WEAPONS)
                    break;
                case 'sell_ammo':
                    hideMenu = false;
                    setMode(MODE_SELL_AMMO);
                    break;
                case 'friend':
                    SendMessageComposer(new RequestFriendComposer(avatarInfo.name));
                    break;
                case 'unfriend':
                    SendMessageComposer(new RemoveFriendComposer(avatarInfo.webID));
                    break;
            }
        }

        if (hideMenu) onClose();
    }

    useEffect(() => {
        setMode(MODE_NORMAL);
    }, [avatarInfo]);

    return (
        <ContextMenuView objectId={avatarInfo.roomIndex} category={RoomObjectCategory.UNIT} userType={avatarInfo.userType} onClose={onClose} collapsable={true}>
            <ContextMenuHeaderView className="cursor-pointer" onClick={event => GetUserProfile(avatarInfo.webID)}>
                {roleplayStats.isDead && '☠️'}
                {avatarInfo.name}
            </ContextMenuHeaderView>
            {
                roleplayStats.isDead && (
                    <ContextMenuListItemView>
                        {LocalizeText('infostand.button.user_is_dead').replace(':user', avatarInfo.name)}
                    </ContextMenuListItemView>
                )
            }
            {
                !roleplayStats.isDead && (
                    <>
                        {(mode === MODE_NORMAL) &&
                            <>
                                {
                                    sessionRoleplayStats.isWorking && (
                                        <>
                                            <ContextMenuListItemView onClick={() => processAction('view_business')}>
                                                Work
                                                <FaChevronRight className="right fa-icon" />
                                            </ContextMenuListItemView>
                                        </>
                                    )
                                }
                                {
                                    sessionRoleplayStats.isWorking && myCorpData.industry === CorpIndustry.Police && (
                                        <ContextMenuListItemView onClick={() => processAction('view_police')}>
                                            <FaChevronRight className="right fa-icon" />
                                            Police
                                        </ContextMenuListItemView>
                                    )
                                }
                                {
                                    roleplayStats.gangID ? (
                                        <ContextMenuListItemView onClick={() => processAction('view_gang')}>
                                            <FaChevronRight className="right fa-icon" />
                                            Gang
                                        </ContextMenuListItemView>
                                    )
                                        : null}
                                {
                                    canRequestFriend(avatarInfo.webID)
                                        ? <ContextMenuListItemView onClick={() => processAction('friend')}>
                                            {LocalizeText('infostand.button.friend')}
                                        </ContextMenuListItemView>
                                        : !!getFriend(avatarInfo.webID)
                                            ? <ContextMenuListItemView onClick={() => processAction('unfriend')}>
                                                Unfriend
                                            </ContextMenuListItemView>
                                            : ''
                                }
                            </>}
                        {(mode === MODE_WORK) &&
                            <>
                                {
                                    roleplayStats.corpIndustry === CorpIndustry.GunStore && (
                                        <>
                                            <ContextMenuListItemView onClick={() => processAction('sell_ammo')}>
                                                Sell Ammo
                                            </ContextMenuListItemView>
                                            <ContextMenuListItemView onClick={() => processAction('sell_weapons')}>
                                                Sell Weapons
                                            </ContextMenuListItemView>
                                        </>
                                    )
                                }
                                {
                                    roleplayStats.corporationID !== sessionRoleplayStats.corporationID && (
                                        <ContextMenuListItemView onClick={() => processAction('corp_offer_job')}>
                                            {LocalizeText('infostand.button.corp_offer_job')}
                                        </ContextMenuListItemView>
                                    )
                                }
                                {
                                    roleplayStats.corporationID === sessionRoleplayStats.corporationID && (
                                        <>
                                            <ContextMenuListItemView onClick={() => processAction('corp_fire_user')}>
                                                Fire
                                            </ContextMenuListItemView>
                                            <ContextMenuListItemView onClick={() => processAction('corp_promote_user')}>
                                                Promote
                                            </ContextMenuListItemView>
                                            <ContextMenuListItemView onClick={() => processAction('corp_demote_user')}>
                                                Demote
                                            </ContextMenuListItemView>
                                        </>
                                    )
                                }
                            </>}
                        {(mode === MODE_GANG) &&
                            <>
                                {
                                    roleplayStats.gangID !== sessionRoleplayStats.gangID && (
                                        <>
                                            <ContextMenuListItemView onClick={() => processAction('gang_invite_user')}>
                                                Invite
                                            </ContextMenuListItemView>
                                        </>
                                    )
                                }
                            </>
                        }
                        {(mode === MODE_POLICE) &&
                            <>
                                {
                                    !roleplayStats.isCuffed && !roleplayStats.isStunned && !roleplayStats.isDead && (
                                        <ContextMenuListItemView onClick={() => processAction('police_stun')}>
                                            Stun
                                        </ContextMenuListItemView>
                                    )
                                }
                                {
                                    roleplayStats.isStunned && !roleplayStats.isCuffed && (
                                        <ContextMenuListItemView onClick={() => processAction('police_cuff')}>
                                            Cuff
                                        </ContextMenuListItemView>
                                    )
                                }
                                {
                                    roleplayStats.isCuffed && !roleplayStats.escortedByUserID && (
                                        <ContextMenuListItemView onClick={() => processAction('police_escort')}>
                                            Escort
                                        </ContextMenuListItemView>
                                    )
                                }
                                {
                                    roleplayStats.escortedByUserID === sessionInfo.userId && (
                                        <ContextMenuListItemView onClick={() => processAction('police_escort')}>
                                            Stop Escort
                                        </ContextMenuListItemView>
                                    )
                                }
                                {
                                    roleplayStats.isCuffed && roleplayStats.escortedByUserID == null && (
                                        <ContextMenuListItemView onClick={() => processAction('police_cuff')}>
                                            Uncuff
                                        </ContextMenuListItemView>
                                    )
                                }
                                {
                                    roleplayStats.isCuffed && !!roleplayStats.escortedByUserID && (
                                        <ContextMenuListItemView onClick={() => processAction('view_police_arrest')}>
                                            Arrest
                                        </ContextMenuListItemView>
                                    )
                                }
                            </>
                        }
                        {(mode === MODE_ARREST) &&
                            <>
                                {
                                    crimeList.map(crime => (
                                        <ContextMenuListItemView key={`crime_${crime.id}`} onClick={() => { onClose(); PoliceArrestUser(avatarInfo.webID) }}>
                                            {crime.displayName} ({crime.jailTime}mins)
                                        </ContextMenuListItemView>
                                    ))
                                }
                            </>
                        }
                        {(mode === MODE_SELL_WEAPONS) &&
                            <>
                                {
                                    shiftWeapons.map(weapon => (
                                        <ContextMenuListItemView key={`weapon_${weapon.productId}`} onClick={() => { onSellProduct(weapon.productId) }}>
                                            {weapon.productName}
                                        </ContextMenuListItemView>
                                    ))
                                }
                            </>
                        }
                        {(mode === MODE_SELL_AMMO) &&
                            <>
                                {
                                    shiftAmmo.map(ammo => (
                                        <ContextMenuListItemView key={`ammo_${ammo.productId}`} onClick={() => { onSellProduct(ammo.productId) }}>
                                            {ammo.productName}
                                        </ContextMenuListItemView>
                                    ))
                                }
                            </>
                        }

                        {
                            mode !== MODE_NORMAL && (
                                <ContextMenuListItemView onClick={() => processAction('back')}>
                                    <FaCaretLeft style={{ marginRight: 6 }} />
                                    Back
                                </ContextMenuListItemView>
                            )
                        }
                    </>
                )
            }
        </ContextMenuView>
    );
}
