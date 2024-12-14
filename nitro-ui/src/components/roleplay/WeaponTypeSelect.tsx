import Select from 'react-select';
import { CorpIndustry, WeaponType } from "@nitro-rp/renderer";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface WeaponTypeSelectProps {
    type?: WeaponType;
    onChange(newType: WeaponType): void;
}

const WEAPON_TYPE_OPTIONS: Array<{ label: string; value: WeaponType }> = Object.entries(WeaponType).map(([key, value]) => ({ label: key, value }));

export function WeaponTypeSelect({ type, onChange }: WeaponTypeSelectProps) {

    function onChangeType(opt: any) {
        const mathingIndustry = WEAPON_TYPE_OPTIONS.find(_ => _.value === opt.value);
        if (!mathingIndustry) {
            return;
        }
        onChange(mathingIndustry.value);
    }

    return (
        <Select
            options={WEAPON_TYPE_OPTIONS}
            value={WEAPON_TYPE_OPTIONS.find(option => option.value === type)}
            onChange={onChangeType}
            placeholder="Select a weapon type"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}