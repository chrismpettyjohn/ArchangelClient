import Select from 'react-select';
import { useMemo } from "react";
import { useCrimes } from "../../api/roleplay/police/GetCrimes";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface CrimeSelectProps {
    crimeID: number;
    onChange(crimeID: number): void;
}

export function CrimeSelect({ crimeID, onChange }: CrimeSelectProps) {
    const crimeList = useCrimes();
    const crimeOptions = useMemo(() => {
        return crimeList.map(_ => ({
            label: <>{_.displayName} ({_.jailTime} mins)</>,
            value: _.id,
        }))
    }, [crimeList]);

    function onChangeCrime(opt: any) {
        onChange(opt.value);
    }

    return (
        <Select
            options={crimeOptions}
            value={crimeOptions.find(option => option.value === crimeID)}
            onChange={onChangeCrime}
            placeholder="Select a crime"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}