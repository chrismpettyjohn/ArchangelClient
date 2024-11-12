import { ChangeEvent } from "react";
import { CorpSector } from "@nitro-rp/renderer";

export interface CorpSectorSelectProps {
    sector?: CorpSector;
    onChange(newSector: CorpSector): void;
}

const CORP_SECTOR_OPTIONS: Array<{ key: string; value: CorpSector; }> = Object.values(CorpSector).map(_ => ({ key: _, value: _ }))

export function CorpSectorSelect({ sector, onChange }: CorpSectorSelectProps) {

    function onChangeSector(event: ChangeEvent<HTMLSelectElement>) {
        const mathingSector = CORP_SECTOR_OPTIONS.find(_ => _.key === event.currentTarget.value);
        if (!mathingSector) {
            return;
        }
        onChange(mathingSector.value);
    }

    return (
        <select className="form-control form-control-sm" value={sector} onChange={onChangeSector}>
            {
                !sector && <option selected disabled>Select a sector</option>
            }
            {
                CORP_SECTOR_OPTIONS.map(sector => (
                    <option key={`sector_${sector.key}`} value={sector.value}>
                        {sector.value}
                    </option>
                ))
            }
        </select>
    )
}