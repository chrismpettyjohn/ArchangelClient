import Select from 'react-select';
import { AmmoSize } from "@nitro-rp/renderer";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface AmmoSizeSelectProps {
    ammoSize?: AmmoSize;
    onChange(newAmmoSize: AmmoSize): void;
}

const AMMO_SIZE_OPTIONS: Array<{ label: string; value: AmmoSize }> = Object.entries(AmmoSize).map(([key, value]) => ({ label: key, value }));

export function AmmoSizeSelect({ ammoSize, onChange }: AmmoSizeSelectProps) {

    function onChangeAmmoSize(opt: any) {
        const matchingAmmo = AMMO_SIZE_OPTIONS.find(_ => _.value === opt.value);
        if (!matchingAmmo) {
            return;
        }
        onChange(matchingAmmo.value);
    }

    return (
        <Select
            options={AMMO_SIZE_OPTIONS}
            value={AMMO_SIZE_OPTIONS.find(option => option.value === ammoSize)}
            onChange={onChangeAmmoSize}
            placeholder="Select ammo size"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}