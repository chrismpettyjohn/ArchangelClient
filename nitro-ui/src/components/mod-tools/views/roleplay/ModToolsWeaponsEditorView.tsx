import { ILinkEventTracker, WeaponData, WeaponDataEvent, WeaponQueryOneComposer, WeaponUpdateComposer } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../../../common';
import { useCallback, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { ChatWidgetOverlay } from '../../../chat-widget-overlay/ChatWidgetOverlay';
import { useMessageEvent } from '../../../../hooks';
import { WeaponDTO, WeaponEditor } from './editors/WeaponEditor';

export function ModToolsWeaponsEditorView() {
    const [loading, setLoading] = useState(false);
    const [weaponID, setWeaponID] = useState<number>();
    const [weaponData, setWeaponData] = useState<WeaponData>();

    useEffect(() => {
        if (!weaponID) {
            return;
        }
        SendMessageComposer(new WeaponQueryOneComposer(weaponID));
    }, [weaponID]);

    useMessageEvent(WeaponDataEvent, (event: WeaponDataEvent) => {
        setWeaponData(event.getParser().weapon)
        setLoading(false);
    })

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 4) return;

                const weaponID = parts[3];

                if (!weaponID) {
                    return;
                }

                setWeaponID(Number(weaponID));
            },
            eventUrlPrefix: 'staff/weapons-manager/edit'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setWeaponID]);

    const onSubmit = useCallback((data: WeaponDTO) => {
        if (loading) {
            return;
        } data
        SendMessageComposer(new WeaponUpdateComposer(weaponID, data.unequipMessage, data.displayName, data.minDamage, data.maxDamage, data.range, data.accuracy, data.reloadTime, data.reloadMessage, data.ammoCapacity, data.weight, data.cooldown, data.equipEffect, data.equipMessage, data.unequipMessage, data.attackMessage))
        setLoading(true);
    }, [weaponData, loading]);

    if (!weaponID) {
        return null;
    }

    return (
        <ChatWidgetOverlay visible>
            <NitroCardView uniqueKey="staff-weapons" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 600 }}>
                <NitroCardHeaderView headerText="Weapons Manager" onCloseClick={() => setWeaponID(undefined)} />
                <NitroCardContentView className="h-100">
                    {
                        !loading && !!weaponData
                            ? <WeaponEditor defaultWeapon={weaponData} onSubmit={onSubmit} />
                            : (
                                <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <FaSpinner className="fa-spin fa-4x" />
                                </div>
                            )
                    }
                </NitroCardContentView>
            </NitroCardView>
        </ChatWidgetOverlay>
    );
}
