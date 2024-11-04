import { ILinkEventTracker, WeaponCreateComposer, WeaponData, WeaponDataEvent, WeaponQueryOneComposer, WeaponUpdateComposer } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../../../common';
import { useCallback, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { ChatWidgetOverlay } from '../../../chat-widget-overlay/ChatWidgetOverlay';
import { useMessageEvent } from '../../../../hooks';
import { WeaponDTO, WeaponEditor } from './editors/WeaponEditor';

export function ModToolsWeaponsCreatorView() {
    const [visible, setVisible] = useState(false);

    useMessageEvent(WeaponDataEvent, () => {
        setVisible(false);
    })

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: () => {
                setVisible(true);
            },
            eventUrlPrefix: 'staff/weapons-manager/create'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

    const onSubmit = useCallback((data: WeaponDTO) => {
        SendMessageComposer(new WeaponCreateComposer(data.unequipMessage, data.displayName, data.minDamage, data.maxDamage, data.range, data.accuracy, data.reloadTime, data.reloadMessage, data.ammoCapacity, data.weight, data.cooldown, data.equipEffect, data.equipMessage, data.unequipMessage, data.attackMessage))
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <ChatWidgetOverlay visible>
            <NitroCardView uniqueKey="staff-weapons" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 600 }}>
                <NitroCardHeaderView headerText="Weapons Manager" onCloseClick={() => setVisible(false)} />
                <NitroCardContentView className="h-100">
                    <WeaponEditor onSubmit={onSubmit} />
                </NitroCardContentView>
            </NitroCardView>
        </ChatWidgetOverlay>
    );
}
