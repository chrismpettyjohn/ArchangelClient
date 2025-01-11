import { FC } from 'react';
import { OfferView } from '../catalog/views/targeted-offer/OfferView';
import { GroupRoomInformationView } from '../groups/views/GroupRoomInformationView';
import { NotificationCenterView } from '../notification-center/NotificationCenterView';
import { MysteryBoxExtensionView } from '../room/widgets/mysterybox/MysteryBoxExtensionView';
import { RoomPromotesWidgetView } from '../room/widgets/room-promotes/RoomPromotesWidgetView';
import { OnlineUserCount } from './online-user-count/OnlineUserCount';
import { TimeOfDay } from './time-of-day/TimeOfDay';
import { CashBalance } from './cash-balance/CashBalance';
import { WeaponWheel } from './weapon-wheel/WeaponWheel';
import { EquippedWeapon } from './equipped-weapon/EquippedWeapon';

export const RightSideView: FC<{}> = props => {
    return (
        <>
            <div className="nitro-right-side">
                <div>
                    <div className="nitro-time-of-day">
                        <div style={{ display: 'flex', gap: 14 }}>
                            <TimeOfDay />
                            <OnlineUserCount />
                        </div>
                        <CashBalance />
                    </div>
                    <br />
                    <GroupRoomInformationView />
                    <MysteryBoxExtensionView />
                    <OfferView />
                    <RoomPromotesWidgetView />
                    <EquippedWeapon />
                    <WeaponWheel />
                </div>
            </div >
        </>
    );
}
