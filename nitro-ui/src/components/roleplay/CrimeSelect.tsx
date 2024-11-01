import { ChangeEvent } from "react";
import { Crime, useCrimes } from "../../api/roleplay/police/GetCrimes";

export interface CrimeSelectProps {
    crime: string;
    onChange(crime: Crime): void;
}

export function CrimeSelect({ crime, onChange }: CrimeSelectProps) {
    const crimeList = useCrimes();

    function onChangeCrime(event: ChangeEvent<HTMLSelectElement>) {
        const matchingCrime = crimeList.find(_ => _.crime === event.currentTarget.value);
        if (!matchingCrime) {
            return;
        }
        onChange(matchingCrime);
    }

    return (
        <select className="form-control form-control-sm" value={crime} onChange={onChangeCrime}>
            {
                !crime && <option selected disabled>Select a crime</option>
            }
            {
                crimeList.map(crime => (
                    <option key={`crime_${crime.crime}`} value={crime.crime}>
                        {crime.crime} ({crime.sentence} mins)
                    </option>
                ))
            }
        </select>
    )
}