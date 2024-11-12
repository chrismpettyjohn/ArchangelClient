import Select from 'react-select';
import { useEffect, useMemo, useState } from "react";
import { LicenseAgencyData, LicenseAgencyListEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../hooks";
import { LicenseAgencyListQuery } from "../../api/roleplay/license/LicenseAgencyListQuery";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface LicenseAgencySelectProps {
    corpID?: number;
    onChange(newBank: LicenseAgencyData): void;
}

export function LicenseAgencySelect({ corpID, onChange }: LicenseAgencySelectProps) {
    const [licenseAgencies, setLicenseAgencies] = useState<Array<LicenseAgencyData>>([]);
    const licenseOptions = useMemo(() => {
        return licenseAgencies.map(_ => ({
            label: _.corpName,
            value: _.corpID,
        }))
    }, [licenseAgencies]);

    useEffect(() => {
        LicenseAgencyListQuery();
    }, []);

    useMessageEvent<LicenseAgencyListEvent>(LicenseAgencyListEvent, event => {
        setLicenseAgencies(event.getParser().agencies);
    });

    function onChangeAgency(opt: any) {
        const matchingAgency = licenseAgencies.find(_ => _.corpID === Number(opt.value));
        if (!matchingAgency) {
            return;
        }
        onChange(matchingAgency);
    }

    return (
        <Select
            options={licenseOptions}
            value={licenseOptions.find(option => option.value === corpID)}
            onChange={onChangeAgency}
            placeholder="Select an agency"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}