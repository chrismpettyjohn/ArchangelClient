import Select from 'react-select';
import { useMemo } from "react";
import { Crime, useCrimes } from "../../api/roleplay/police/GetCrimes";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface CrimeSelectProps {
    crimeID: number;
    onChange(crime: Crime): void;
}

export function CrimeSelect({ crimeID, onChange }: CrimeSelectProps) {
    const crimeList = useCrimes();
    const crimeOptions = useMemo(() => {
        return crimeList.map(_ => ({
            label: _.crime,
            value: _.id,
        }))
    }, [crimeList]);

    function onChangeCrime(event: any) {
        const matchingCrime = crimeList.find(_ => _.crime === event.currentTarget.value);
        if (!matchingCrime) {
            return;
        }
        onChange(matchingCrime);
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