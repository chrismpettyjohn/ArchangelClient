import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { CreateLinkEvent, GetRoomEngine } from "../../../api";
import { Text } from "../../../common";
import { useMessageEvent, useSessionInfo } from "../../../hooks";
import { useMyWeaponList } from "../../../hooks/roleplay/use-my-weapon-list";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";
import { CombatDelayEvent, CursorMode, NitroConfiguration } from "@nitro-rp/renderer";
import { Button } from "react-bootstrap";
import { FaRedo, FaShieldAlt, FaSkullCrossbones } from "react-icons/fa"; // Font Awesome reload icon
import { WeaponReload } from "../../../api/roleplay/combat/WeaponReload";

export function EquippedWeapon() {
    const session = useSessionInfo();
    const weapons = useMyWeaponList();
    const roleplayStats = useRoleplayStats(session?.userInfo?.userId);
    const [combatDelayExpiresAt, setCombatDelayExpiresAt] = useState<number>();
    const [remainingTime, setRemainingTime] = useState<number>(0);

    useEffect(() => {
        GetRoomEngine().setCursorMode(combatDelayExpiresAt ? CursorMode.Interact : CursorMode.Attack);
    }, [combatDelayExpiresAt]);

    useMessageEvent(CombatDelayEvent, (event: CombatDelayEvent) => {
        const expiresAt = event.getParser().data.combatDelayRemaining;
        setCombatDelayExpiresAt(expiresAt);
    });

    useEffect(() => {
        if (!combatDelayExpiresAt) return;

        const interval = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const timeLeft = combatDelayExpiresAt - currentTime + 1; // Add 1 second to account for rounding

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


    function onToggleSafety(event: SyntheticEvent) {
        event.stopPropagation();
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
                    {equippedWeapon?.magazineSize ? (
                        <>
                            <div className="current-ammo">{roleplayStats.equippedWeaponAmmoLeft}</div>
                            <div className="reserve-ammo">/&nbsp;{equippedWeapon.magazineSize}</div>
                            <Button variant="link" onClick={onReload} className="reload-button">
                                <FaRedo />
                            </Button>
                        </>
                    ) : ''}
                    <Button variant="link" onClick={onToggleSafety} className="reload-button">
                        {combatDelayExpiresAt ? <FaShieldAlt /> : <FaSkullCrossbones style={{ color: 'red' }} />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
