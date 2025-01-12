import { ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker } from '../../../../api';
import { DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../../../common';
import { useEffect, useMemo, useState } from 'react';
import { useRoleplayStats } from '../../../../hooks/roleplay/use-rp-stats';
import { TabWidget } from '../../../../common/TabWidget';
import { UserWeaponInventory } from './inventory/UserWeaponInventory';


export function ModToolsInventoryView() {
    const [userID, setUserID] = useState<number>();
    const rpStats = useRoleplayStats(userID);
    const views: TabWidget[] = useMemo(() => [
        {
            key: 'ammo',
            label: 'Ammo',
            view: () => <p>ammo</p>
        },
        {
            key: 'weapons',
            label: 'Weapons',
            view: () => <UserWeaponInventory userId={userID} />
        },
        {
            key: 'hotbar',
            label: 'Hotbar',
            view: () => <p>hotbar</p>
        },
        {
            key: 'furni',
            label: 'Furni',
            view: () => <p>furni</p>
        },
    ], [userID]);

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 3) return;

                setUserID(Number(parts[2]));
            },
            eventUrlPrefix: 'staff/player-inventory-manager'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setUserID]);

    if (!userID || !rpStats.userID) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="staff-user-inventory" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 400 }}>
            <NitroCardHeaderView headerText={`${rpStats.username}'s Inventory`} onCloseClick={() => setUserID(undefined)} />
            <NitroCardContentView className="h-100">
                <TabWidget widgets={views} />
            </NitroCardContentView>
        </NitroCardView>
    );
}
