import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { CreateLinkEvent, GetRoomEngine } from "../../../api";
import { Text } from "../../../common";
import { useSessionInfo } from "../../../hooks";
import { useMyWeaponList } from "../../../hooks/roleplay/use-my-weapon-list";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";
import { CursorMode, NitroConfiguration } from "@nitro-rp/renderer";
import { Button } from "react-bootstrap";
import { FaRedo, FaShieldAlt, FaSkullCrossbones } from "react-icons/fa"; // Font Awesome reload icon
import { WeaponReload } from "../../../api/roleplay/combat/WeaponReload";

export function EquippedWeapon() {
    const session = useSessionInfo();
    const weapons = useMyWeaponList();
    const roleplayStats = useRoleplayStats(session?.userInfo?.userId);
    const [safety, setSafety] = useState(true);

    useEffect(() => {
        GetRoomEngine().setCursorMode(safety ? CursorMode.Interact : CursorMode.Attack);
    }, [safety]);


    function onToggleSafety(event: SyntheticEvent) {
        event.stopPropagation();
        setSafety(prev => !prev);
    }

    function onReload(event: SyntheticEvent) {
        event.stopPropagation();
        WeaponReload();
    }

    const equippedWeapon = useMemo(() => {
        const matchingWeapon = weapons.find(_ => _.itemID === roleplayStats.equippedWeaponID)
        if (matchingWeapon) {
            return matchingWeapon;
        }

        return {
            itemID: 0,
            uniqueName: 'unarmed',
            displayName: 'Unarmed',
            equipEffect: 0,
            magazineSize: 0,
        }
    }, [roleplayStats.equippedWeaponID]);


    return (
        <div className="nitro-equipped-weapon glass-panel" onClick={() => CreateLinkEvent('weapon-wheel/toggle')} style={{ zIndex: 1000, cursor: 'pointer' }}>
            <div className="weapon-hud">
                <div className="weapon-info">
                    <img src={`${NitroConfiguration.getValue('image.library.url')}/weapon_icons/${equippedWeapon.uniqueName}.png`} alt={equippedWeapon.uniqueName} className="weapon-icon" style={{ width: 145 }} />
                    <div className="weapon-name">
                        <Text bold center variant="white" fontSize={4} style={{ paddingTop: 20 }}>
                            {equippedWeapon.displayName}
                        </Text>
                    </div>
                </div>
                <div className="ammo-info">
                    {
                        equippedWeapon?.magazineSize ? (
                            <>
                                <div className="current-ammo">{roleplayStats.equippedWeaponAmmoLeft}</div>
                                <div className="reserve-ammo">/&nbsp;{equippedWeapon.magazineSize}</div>
                                <Button variant="link" onClick={onReload} className="reload-button">
                                    <FaRedo />
                                </Button>
                            </>
                        )
                            : ''
                    }
                    <Button variant="link" onClick={onToggleSafety} className="reload-button">
                        {safety ? <FaShieldAlt /> : <FaSkullCrossbones style={{ color: 'red' }} />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
