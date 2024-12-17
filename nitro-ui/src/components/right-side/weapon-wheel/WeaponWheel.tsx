import { Text } from "../../../common";
import { useCallback, useEffect, useState } from "react";
import { AmmoSize, EquipAmmoComposer, ILinkEventTracker, MyWeaponData, MyWeaponListEvent, NitroConfiguration } from "@nitro-rp/renderer";
import { EquipWeapon } from "../../../api/roleplay/combat/EquipWeapon";
import { AddEventLinkTracker, RemoveLinkEventTracker, SendMessageComposer } from "../../../api";
import { useMessageEvent, useSessionInfo } from "../../../hooks";
import { ListMyWeapons } from "../../../api/roleplay/combat/ListMyWeapons";
import { AmmoSelect } from "../../roleplay/AmmoSelect";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";

export function WeaponWheel() {
    const { userInfo } = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userId)
    const [visible, setVisible] = useState(false)
    const [weaponList, setWeaponList] = useState<MyWeaponData[]>([]);
    const [hoveredItem, setHoveredItem] = useState<MyWeaponData>();

    const onEquip = useCallback((playerWeaponId: number) => {
        EquipWeapon(playerWeaponId);
        setVisible(false);
    }, []);

    useEffect(() => {
        if (visible) {
            ListMyWeapons();
        }
    }, [visible]);

    useMessageEvent<MyWeaponListEvent>(MyWeaponListEvent, event => {
        const eventData: MyWeaponData[] = event.getParser().data;
        setWeaponList(eventData);
    });

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 2) return;

                switch (parts[1]) {
                    case 'show':
                        setVisible(true);
                        return;
                    case 'hide':
                        setVisible(false);
                        return;
                    case 'toggle':
                        setVisible(_ => !_);
                        return;
                }
            },
            eventUrlPrefix: 'weapon-wheel/'
        };

        AddEventLinkTracker(linkTracker);

        return () => {
            RemoveLinkEventTracker(linkTracker);
        };
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <div id="weapon-wheel" className="modal" onClick={() => setVisible(false)}>

            <div className="wheel" onClick={e => e.stopPropagation()}>
                {
                    (weaponList.slice(0, 8)).map((weapon, i) => (
                        <div className="wheel-item" key={`weapon_${weapon.uniqueName}`} id={`item${i + 1}`} onMouseEnter={() => setHoveredItem(weapon)} onClick={() => onEquip(weapon.id)}>
                            <img src={`${NitroConfiguration.getValue('image.library.url')}/weapon_icons/${weapon.uniqueName}.png`} alt={weapon.uniqueName} className="weapon-icon" />
                        </div>
                    ))
                }
            </div>
            <div className="center-info">
                <div className="weapon-name">
                    <Text bold fontSize={5} variant="white">
                        {hoveredItem ? hoveredItem.displayName : ''}
                        {!weaponList.length ? "You don't own any weapons" : ''}
                    </Text>
                    {
                        hoveredItem && (
                            <div style={{ width: 200, marginTop: 12 }} onClick={e => e.stopPropagation()}>
                                <AmmoSelect ammoId={rpStats?.equippedWeaponAmmoId} ammoSize={hoveredItem?.ammoSize} onChange={_ => SendMessageComposer(new EquipAmmoComposer(_.id))} />
                                <div style={{ marginTop: 12 }}>
                                    <Text fontSize={5}><strong>{rpStats.totalAmmoLeft}</strong> rounds left</Text>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}