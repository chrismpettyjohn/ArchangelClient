import { PlayerQuerySkillsListComposer, PlayerQuerySkillsListEvent, PlayerSkillsData } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";

export function usePlayerSkills(userID: number): PlayerSkillsData {
    const [skills, setSkills] = useState<PlayerSkillsData>({
        userId: userID,
        strengthXp: -1,
        strengthLevel: -1,
        lumberjackXp: -1,
        lumberjackLevel: -1,
        meleeXp: -1,
        meleeLevel: -1,
        weaponXp: -1,
        weaponLevel: -1,
        farmingXp: -1,
        farmingLevel: -1,
        miningXp: -1,
        miningLevel: -1,
        staminaXp: -1,
        staminaLevel: -1,
    });

    useEffect(() => {
        if (!userID) return;
        SendMessageComposer(new PlayerQuerySkillsListComposer(userID));
    }, [userID]);

    useMessageEvent(PlayerQuerySkillsListEvent, (event: PlayerQuerySkillsListEvent) => {
        if (event.getParser().skills.userId !== userID) {
            return;
        }
        setSkills(event.getParser().skills)
    })

    return skills;
}