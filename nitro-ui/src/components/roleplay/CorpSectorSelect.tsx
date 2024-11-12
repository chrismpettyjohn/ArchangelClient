import Select from 'react-select';
import { CorpSector } from "@nitro-rp/renderer";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface CorpSectorSelectProps {
    sector?: CorpSector;
    onChange(newSector: CorpSector): void;
}

const CORP_SECTOR_OPTIONS: Array<{ label: string; value: CorpSector }> = Object.entries(CorpSector).map(([key, value]) => ({ label: key, value }));

console.log(CORP_SECTOR_OPTIONS)

export function CorpSectorSelect({ sector, onChange }: CorpSectorSelectProps) {

    function onChangeSector(opt: any) {
        const mathingSector = CORP_SECTOR_OPTIONS.find(_ => _.value === opt.value);
        if (!mathingSector) {
            return;
        }
        onChange(mathingSector.value);
    }

    return (
        <Select
            options={CORP_SECTOR_OPTIONS}
            value={CORP_SECTOR_OPTIONS.find(option => option.value === sector)}
            onChange={onChangeSector}
            placeholder="Select a sector"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}