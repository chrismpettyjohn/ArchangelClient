import { AvatarAction, AvatarExpressionEnum, RoomObjectCategory, RoomUnitDropHandItemComposer, UserOpenWardrobeEvent } from '@nitro-rp/renderer';
import { FC, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AvatarInfoUser, CreateLinkEvent, GetCanStandUp, GetCanUseExpression, GetOwnPosture, GetUserProfile, HasHabboClub, HasHabboVip, IsRidingHorse, LocalizeText, PostureTypeEnum, SendMessageComposer } from '../../../../../api';
import { Flex, LayoutCurrencyIcon } from '../../../../../common';
import { useRoom } from '../../../../../hooks';
import { ContextMenuHeaderView } from '../../context-menu/ContextMenuHeaderView';
import { ContextMenuListItemView } from '../../context-menu/ContextMenuListItemView';
import { ContextMenuView } from '../../context-menu/ContextMenuView';
import { CorpStopWork } from '../../../../../api/roleplay/corp/CorpStopWork';
import { CorpStartWork } from '../../../../../api/roleplay/corp/CorpStartWork';
import { GangLeave } from '../../../../../api/roleplay/gang/GangLeave';
import { GangDisband } from '../../../../../api/roleplay/gang/GangDisband';
import { useRoleplayStats } from '../../../../../hooks/roleplay/use-rp-stats';
import { useCorpData } from '../../../../../hooks/roleplay/use-corp-data';
import { useCorpPositionData } from '../../../../../hooks/roleplay/use-corp-position-data';

interface AvatarInfoWidgetOwnAvatarViewProps {
    avatarInfo: AvatarInfoUser;
    isDancing: boolean;
    onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_CLUB_DANCES = 1;
const MODE_EXPRESSIONS = 3;
const MODE_SIGNS = 4;
const MODE_BUSINESS = 5;
const MODE_GANGS = 6;

export const AvatarInfoWidgetOwnAvatarView: FC<AvatarInfoWidgetOwnAvatarViewProps> = props => {
    const { avatarInfo = null, isDancing = false, onClose = null } = props;

    const roleplayStats = useRoleplayStats(avatarInfo?.webID);
    const corpData = useCorpData(roleplayStats.corporationID);
    const corpJobPosition = useCorpPositionData(roleplayStats.corporationPositionID);
    const [mode, setMode] = useState((isDancing && HasHabboClub()) ? MODE_CLUB_DANCES : MODE_NORMAL);
    const { roomSession = null } = useRoom();

    const processAction = (name: string) => {
        let hideMenu = true;

        if (name) {
            if (name.startsWith('sign_')) {
                const sign = parseInt(name.split('_')[1]);

                roomSession.sendSignMessage(sign);
            }
            else {
                switch (name) {
                    case 'view_business':
                        hideMenu = false;
                        setMode(MODE_BUSINESS);
                        break;
                    case 'view_gang':
                        hideMenu = false;
                        setMode(MODE_GANGS);
                        break;

                    case 'startwork':
                        CorpStartWork()
                        break;
                    case 'stopwork':
                        CorpStopWork();
                        break;
                    case 'leavegang':
                        GangLeave();
                        break;
                    case 'disbandgang':
                        GangDisband();
                        break;
                    case 'formgang':
                        CreateLinkEvent('groups/create-gang');
                        break;
                    case 'expressions':
                        hideMenu = false;
                        setMode(MODE_EXPRESSIONS);
                        break;
                    case 'sit':
                        roomSession.sendPostureMessage(PostureTypeEnum.POSTURE_SIT);
                        break;
                    case 'wardrobe':
                        CreateLinkEvent('avatar-editor/toggle');
                        break;
                    case 'stand':
                        roomSession.sendPostureMessage(PostureTypeEnum.POSTURE_STAND);
                        break;
                    case 'wave':
                        roomSession.sendExpressionMessage(AvatarExpressionEnum.WAVE.ordinal);
                        break;
                    case 'blow':
                        roomSession.sendExpressionMessage(AvatarExpressionEnum.BLOW.ordinal);
                        break;
                    case 'laugh':
                        roomSession.sendExpressionMessage(AvatarExpressionEnum.LAUGH.ordinal);
                        break;
                    case 'idle':
                        roomSession.sendExpressionMessage(AvatarExpressionEnum.IDLE.ordinal);
                        break;
                    case 'dance_menu':
                        hideMenu = false;
                        setMode(MODE_CLUB_DANCES);
                        break;
                    case 'dance':
                        roomSession.sendDanceMessage(1);
                        break;
                    case 'dance_stop':
                        roomSession.sendDanceMessage(0);
                        break;
                    case 'dance_1':
                    case 'dance_2':
                    case 'dance_3':
                    case 'dance_4':
                        roomSession.sendDanceMessage(parseInt(name.charAt((name.length - 1))));
                        break;
                    case 'signs':
                        hideMenu = false;
                        setMode(MODE_SIGNS);
                        break;
                    case 'back':
                        hideMenu = false;
                        setMode(MODE_NORMAL);
                        break;
                    case 'drop_carry_item':
                        SendMessageComposer(new RoomUnitDropHandItemComposer());
                        break;
                }
            }
        }

        if (hideMenu) onClose();
    }

    const isRidingHorse = IsRidingHorse();

    return (
        <ContextMenuView objectId={avatarInfo.roomIndex} category={RoomObjectCategory.UNIT} userType={avatarInfo.userType} onClose={onClose} collapsable={true}>

            <ContextMenuHeaderView className="cursor-pointer" onClick={() => GetUserProfile(avatarInfo.webID)}>
                {avatarInfo.name}
            </ContextMenuHeaderView>
            {(mode === MODE_NORMAL) &&
                <>
                    {
                        (corpJobPosition?.canWorkAnywhere || corpData?.roomID === roomSession?.roomId) && (
                            <ContextMenuListItemView onClick={() => processAction('view_business')}>
                                <FaChevronRight className="right fa-icon" />
                                {LocalizeText('infostand.button.business')}
                            </ContextMenuListItemView>
                        )
                    }
                    <ContextMenuListItemView onClick={() => processAction('view_gang')}>
                        <FaChevronRight className="right fa-icon" />
                        {LocalizeText('infostand.button.gang')}
                    </ContextMenuListItemView>
                    {!isRidingHorse &&
                        <ContextMenuListItemView onClick={() => processAction('dance_menu')}>
                            <FaChevronRight className="right fa-icon" />
                            {LocalizeText('widget.memenu.dance')}
                        </ContextMenuListItemView>}
                    <ContextMenuListItemView onClick={() => processAction('expressions')}>
                        <FaChevronRight className="right fa-icon" />
                        {LocalizeText('infostand.link.expressions')}
                    </ContextMenuListItemView>
                    <ContextMenuListItemView onClick={() => processAction('signs')}>
                        <FaChevronRight className="right fa-icon" />
                        {LocalizeText('infostand.show.signs')}
                    </ContextMenuListItemView>
                    {(avatarInfo.carryItem > 0) &&
                        <ContextMenuListItemView onClick={() => processAction('drop_carry_item')}>
                            {LocalizeText('avatar.widget.drop_hand_item')}
                        </ContextMenuListItemView>}
                    <ContextMenuListItemView onClick={() => processAction('wardrobe')}>
                        Change Clothes
                    </ContextMenuListItemView>
                </>}
            {(mode === MODE_CLUB_DANCES) &&
                <>
                    {isDancing &&
                        <ContextMenuListItemView onClick={() => processAction('dance_stop')}>
                            {LocalizeText('widget.memenu.dance.stop')}
                        </ContextMenuListItemView>}
                    <ContextMenuListItemView onClick={() => processAction('dance_1')}>
                        {LocalizeText('widget.memenu.dance1')}
                    </ContextMenuListItemView>
                    <ContextMenuListItemView onClick={() => processAction('dance_2')}>
                        {LocalizeText('widget.memenu.dance2')}
                    </ContextMenuListItemView>
                    <ContextMenuListItemView onClick={() => processAction('dance_3')}>
                        {LocalizeText('widget.memenu.dance3')}
                    </ContextMenuListItemView>
                    <ContextMenuListItemView onClick={() => processAction('dance_4')}>
                        {LocalizeText('widget.memenu.dance4')}
                    </ContextMenuListItemView>
                    <ContextMenuListItemView onClick={() => processAction('back')}>
                        <FaChevronLeft className="left fa-icon" />
                        {LocalizeText('generic.back')}
                    </ContextMenuListItemView>
                </>}
            {(mode === MODE_EXPRESSIONS) &&
                <>
                    {(GetOwnPosture() === AvatarAction.POSTURE_STAND) &&
                        <ContextMenuListItemView onClick={() => processAction('sit')}>
                            {LocalizeText('widget.memenu.sit')}
                        </ContextMenuListItemView>}
                    {GetCanStandUp() &&
                        <ContextMenuListItemView onClick={() => processAction('stand')}>
                            {LocalizeText('widget.memenu.stand')}
                        </ContextMenuListItemView>}
                    {GetCanUseExpression() &&
                        <ContextMenuListItemView onClick={() => processAction('wave')}>
                            {LocalizeText('widget.memenu.wave')}
                        </ContextMenuListItemView>}
                    {GetCanUseExpression() &&
                        <ContextMenuListItemView disabled={!HasHabboVip()} onClick={() => processAction('laugh')}>
                            {!HasHabboVip() && <LayoutCurrencyIcon type="hc" />}
                            {LocalizeText('widget.memenu.laugh')}
                        </ContextMenuListItemView>}
                    {GetCanUseExpression() &&
                        <ContextMenuListItemView disabled={!HasHabboVip()} onClick={() => processAction('blow')}>
                            {!HasHabboVip() && <LayoutCurrencyIcon type="hc" />}
                            {LocalizeText('widget.memenu.blow')}
                        </ContextMenuListItemView>}
                    <ContextMenuListItemView onClick={() => processAction('idle')}>
                        {LocalizeText('widget.memenu.idle')}
                    </ContextMenuListItemView>
                    <ContextMenuListItemView onClick={() => processAction('back')}>
                        <FaChevronLeft className="left fa-icon" />
                        {LocalizeText('generic.back')}
                    </ContextMenuListItemView>
                </>}
            {(mode === MODE_SIGNS) &&
                <>
                    <Flex className="menu-list-split-3">
                        <ContextMenuListItemView onClick={() => processAction('sign_1')}>
                            1
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_2')}>
                            2
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_3')}>
                            3
                        </ContextMenuListItemView>
                    </Flex>
                    <Flex className="menu-list-split-3">
                        <ContextMenuListItemView onClick={() => processAction('sign_4')}>
                            4
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_5')}>
                            5
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_6')}>
                            6
                        </ContextMenuListItemView>
                    </Flex>
                    <Flex className="menu-list-split-3">
                        <ContextMenuListItemView onClick={() => processAction('sign_7')}>
                            7
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_8')}>
                            8
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_9')}>
                            9
                        </ContextMenuListItemView>
                    </Flex>
                    <Flex className="menu-list-split-3">
                        <ContextMenuListItemView onClick={() => processAction('sign_10')}>
                            10
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_11')}>
                            <i className="icon icon-sign-heart" />
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_12')}>
                            <i className="icon icon-sign-skull" />
                        </ContextMenuListItemView>
                    </Flex>
                    <Flex className="menu-list-split-3">
                        <ContextMenuListItemView onClick={() => processAction('sign_0')}>
                            0
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_13')}>
                            <i className="icon icon-sign-exclamation" />
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_15')}>
                            <i className="icon icon-sign-smile" />
                        </ContextMenuListItemView>
                    </Flex>
                    <Flex className="menu-list-split-3">
                        <ContextMenuListItemView onClick={() => processAction('sign_14')}>
                            <i className="icon icon-sign-soccer" />
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_17')}>
                            <i className="icon icon-sign-yellow" />
                        </ContextMenuListItemView>
                        <ContextMenuListItemView onClick={() => processAction('sign_16')}>
                            <i className="icon icon-sign-red" />
                        </ContextMenuListItemView>
                    </Flex>
                    <ContextMenuListItemView onClick={() => processAction('back')}>
                        <FaChevronLeft className="left fa-icon" />
                        {LocalizeText('generic.back')}
                    </ContextMenuListItemView>
                </>}
            {(mode === MODE_BUSINESS) &&
                <>
                    {roleplayStats.isWorking && (
                        <ContextMenuListItemView onClick={() => processAction('stopwork')}>
                            {LocalizeText('widget.memenu.stopwork')}
                        </ContextMenuListItemView>
                    )}
                    {!roleplayStats.isWorking && (
                        <ContextMenuListItemView onClick={() => processAction('startwork')}>
                            {LocalizeText('widget.memenu.startwork')}
                        </ContextMenuListItemView>
                    )}
                    <ContextMenuListItemView onClick={() => processAction('back')}>
                        <FaChevronLeft className="left fa-icon" />
                        {LocalizeText('generic.back')}
                    </ContextMenuListItemView>
                </>}
            {(mode === MODE_GANGS) &&
                <>
                    {
                        roleplayStats.gangID ? (
                            <>
                                <ContextMenuListItemView onClick={() => processAction('leavegang')}>
                                    {LocalizeText('widget.memenu.leavegang')}
                                </ContextMenuListItemView>
                                <ContextMenuListItemView onClick={() => processAction('disbandgang')}>
                                    {LocalizeText('widget.memenu.disbandgang')}
                                </ContextMenuListItemView>
                            </>
                        )
                            : (
                                <>
                                    <ContextMenuListItemView onClick={() => processAction('formgang')}>
                                        {LocalizeText('widget.memenu.formgang')}
                                    </ContextMenuListItemView>
                                </>
                            )
                    }
                    <ContextMenuListItemView onClick={() => processAction('back')}>
                        <FaChevronLeft className="left fa-icon" />
                        {LocalizeText('generic.back')}
                    </ContextMenuListItemView>
                </>
            }
        </ContextMenuView >
    );
}
