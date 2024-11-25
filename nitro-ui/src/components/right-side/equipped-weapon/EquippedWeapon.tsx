import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { CreateLinkEvent, GetRoomEngine } from "../../../api";
import { Text } from "../../../common";
import { useMessageEvent, useSessionInfo } from "../../../hooks";
import { useMyWeaponList } from "../../../hooks/roleplay/use-my-weapon-list";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";
import { CombatDelayEvent, CursorMode, NitroConfiguration } from "@nitro-rp/renderer";
import { Button } from "react-bootstrap";
import { FaRedo, FaShieldAlt, FaSkullCrossbones } from "react-icons/fa";
import { WeaponReload } from "../../../api/roleplay/combat/WeaponReload";

export function EquippedWeapon() {
    const session = useSessionInfo();
    const weapons = useMyWeaponList();
    const roleplayStats = useRoleplayStats(session?.userInfo?.userId);
    const [combatDelayExpiresAt, setCombatDelayExpiresAt] = useState<number>();
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [safety, setSafety] = useState(true);

    function onToggleSafety(event: SyntheticEvent) {
        event.stopPropagation();
        setSafety(prev => !prev);
    }

    useEffect(() => {
        GetRoomEngine().setCursorMode(safety ? CursorMode.Interact : CursorMode.Attack);
    }, [safety]);

    useMessageEvent(CombatDelayEvent, (event: CombatDelayEvent) => {
        const expiresAt = event.getParser().data.combatDelayRemaining;
        setCombatDelayExpiresAt(expiresAt);
    });

    useEffect(() => {
        if (!combatDelayExpiresAt) return;

        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const timeLeft = combatDelayExpiresAt - currentTime + 1;

            if (timeLeft <= 0) {
                setCombatDelayExpiresAt(undefined);
                setRemainingTime(0);
                clearInterval(interval);
            } else {
                setRemainingTime(timeLeft);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [combatDelayExpiresAt]);

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
        <div className="nitro-equipped-weapon glass-panel" onClick={() => CreateLinkEvent('weapon-wheel/toggle')} style={{ zIndex: 1000, cursor: !!combatDelayExpiresAt ? 'not-allowed' : 'pointer' }}>
            {
                !!remainingTime && (
                    <div className="nitro-equipped-weapon-overlay">
                        <div className="attack-timer">
                            Can't attack for {remainingTime} seconds
                        </div>
                    </div>
                )
            }
            <div className="weapon-hud" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={`${NitroConfiguration.getValue('image.library.url')}/weapon_icons/${equippedWeapon.uniqueName}.png`} alt={equippedWeapon.uniqueName} className="weapon-icon" />
                <div className="weapon-info" style={{ textAlign: 'center', flex: 1 }}>
                    <Text bold center variant="white" fontSize={4}>
                        {equippedWeapon.displayName}
                    </Text>
                    <div className="ammo-info" style={{ justifyContent: 'center', marginTop: '5px', fontSize: '12px' }}>
                        {equippedWeapon?.magazineSize ? (
                            <>
                                <div className="current-ammo">{roleplayStats.equippedWeaponAmmoLeft}</div>
                                <div className="reserve-ammo">/&nbsp;{equippedWeapon.magazineSize}</div>
                                <Button variant="link" onClick={onReload} className="reload-button">
                                    <FaRedo />
                                </Button>
                            </>
                        ) : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}