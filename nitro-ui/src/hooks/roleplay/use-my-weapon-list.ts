import { MyWeaponData } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { MyWeaponListEvent } from "@nitro-rp/renderer/src/nitro/communication/messages/incoming/roleplay/combat/MyWeaponListEvent";
import { ListMyWeapons } from "../../api/roleplay/combat/ListMyWeapons";

export function useMyWeaponList(): MyWeaponData[] {
    const [weaponList, setWeaponList] = useState<MyWeaponData[]>([]);

    useEffect(() => {
        ListMyWeapons();
    }, []);

    useMessageEvent<MyWeaponListEvent>(MyWeaponListEvent, event => {
        const eventData: MyWeaponData[] = event.getParser().data;
        setWeaponList(eventData);
    });

    return weaponList;
}