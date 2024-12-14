import Select from 'react-select';
import { useEffect, useMemo, useState } from "react";
import { AmmoSize, ListMyAmmoComposer, MyAmmoData, MyAmmoListEvent } from "@nitro-rp/renderer";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';
import { SendMessageComposer } from '../../api';
import { useMessageEvent } from '../../hooks';

export interface AmmoSelectProps {
    ammoId: number;
    ammoSize: AmmoSize;
    onChange(newAmmo: MyAmmoData): void;
}

export function AmmoSelect({ ammoId, ammoSize, onChange }: AmmoSelectProps) {
    const [ammo, setAmmo] = useState<MyAmmoData[]>([]);
    const ammoOptions = useMemo(() => ammo.filter(_ => _.size === ammoSize).map(_ => ({ label: _.displayName, value: _.id })), [ammo, ammoSize]);

    useEffect(() => {
        SendMessageComposer(new ListMyAmmoComposer());
    }, []);

    useMessageEvent(MyAmmoListEvent, (event: MyAmmoListEvent) => {
        setAmmo(event.getParser().data);
    })

    function onChangeAmmo(opt: any) {
        const matchingRow = ammo.find(_ => _.id === Number(opt.value));
        if (!matchingRow) {
            return;
        }
        onChange(matchingRow);
    }

    return (
        <Select
            options={ammoOptions}
            value={ammoOptions.find(option => option.value === ammoId)}
            onChange={onChangeAmmo}
            placeholder="Select ammo"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}