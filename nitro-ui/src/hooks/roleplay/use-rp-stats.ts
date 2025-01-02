import { useEffect, useState } from "react";
import { CorpIndustry, UserRoleplayStatsChangeData, UserRoleplayStatsChangeEvent } from "@nitro-rp/renderer";
import { UserRoleplayStatsQuery } from "../../api/roleplay/user/UserRoleplayStatsQuery";
import { useMessageEvent } from "../events";

export function useRoleplayStats(userID: number): UserRoleplayStatsChangeData {
    const [roleplayStats, setRoleplayStats] = useState<UserRoleplayStatsChangeData>({
        userID: 0,
        username: '',
        figure: '',
        motto: '',
        joinedAt: 0,
        lastLogin: 0,
        online: false,
        passiveMode: false,
        cashBalance: 0,
        bankBalance: 0,
        isDead: false,
        isCuffed: false,
        isStunned: false,
        escortedByUserID: 0,
        healthNow: 0,
        healthMax: 0,
        energyNow: 0,
        energyMax: 0,
        hungerNow: 0,
        hungerMax: 0,
        corporationID: 0,
        corpName: '',
        corporationPositionID: 0,
        corpRoleName: '',
        corpIndustry: CorpIndustry.Bank,
        isWorking: false,
        gangID: -1,
        gangName: '',
        gangRoleID: -1,
        gangRoleName: '',
        equippedWeaponID: 0,
        equippedWeaponDisplayName: '',
        equippedWeaponUniqueName: '',
        equippedWeaponAmmoId: 0,
        equippedWeaponAmmoLeft: 0,
        totalAmmoLeft: 0,

    })

    useEffect(() => {
        if (!userID) return;
        UserRoleplayStatsQuery(userID)
    }, [userID]);

    useMessageEvent<UserRoleplayStatsChangeEvent>(UserRoleplayStatsChangeEvent, event => {
        const eventData: UserRoleplayStatsChangeData = event.getParser().data;
        if (eventData.userID !== userID) {
            return;
        }
        setRoleplayStats(eventData);
    });

    return roleplayStats;
}