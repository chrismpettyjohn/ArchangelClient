import { ChangeEvent, useEffect, useState } from "react";
import { WeaponListEvent, WeaponListRow, WeaponQueryListComposer } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../hooks";
import { SendMessageComposer } from "../../api";

export interface WeaponSelectProps {
    weaponID?: number;
    onChange(newWeapon: WeaponListRow): void;
}

export function WeaponSelect({ weaponID, onChange }: WeaponSelectProps) {
    const [weapons, setWeapons] = useState<WeaponListRow[]>([]);

    useEffect(() => {
        SendMessageComposer(new WeaponQueryListComposer());
    }, []);

    useMessageEvent<WeaponListEvent>(WeaponListEvent, event => {
        setWeapons(event.getParser().weapons);
    });

    function onChangeBank(event: ChangeEvent<HTMLSelectElement>) {
        const matchingWeapon = weapons.find(_ => _.id === Number(event.currentTarget.value));
        if (!matchingWeapon) {
            return;
        }
        onChange(matchingWeapon);
    }

    return (
        <select className="form-control form-control-sm" value={weaponID} onChange={onChangeBank}>
            {
                !weaponID && <option selected disabled>Select a weapon_</option>
            }
            {
                weapons.map(weapon_ => (
                    <option key={`weapon_${weapon_.id}`} value={weapon_.id}>
                        {weapon_.displayName}
                    </option>
                ))
            }
        </select>
    )
}