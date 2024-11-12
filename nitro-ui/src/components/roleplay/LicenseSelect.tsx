import Select from 'react-select';
import { LicenseType } from "@nitro-rp/renderer";
import { getSelectDarkTheme, SELECT_DARK_THEME } from "./select.base";

export interface LicenseSelectProps {
    licenseType: LicenseType;
    onChange(newLicenseType: LicenseType): void;
}

const LICENSE_TYPE_OPTIONS: Array<{ label: string; value: LicenseType; }> = Object.keys(LicenseType).map(_ => ({
    label: _.toLowerCase(),
    value: LicenseType[_]
}))

export function LicenseSelect({ licenseType, onChange }: LicenseSelectProps) {
    function onChangeLicense(opt: any) {
        onChange(opt.value);
    }

    return (
        <Select
            options={LICENSE_TYPE_OPTIONS}
            value={LICENSE_TYPE_OPTIONS.find(option => option.value === licenseType)}
            onChange={onChangeLicense}
            placeholder="Select a license"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}