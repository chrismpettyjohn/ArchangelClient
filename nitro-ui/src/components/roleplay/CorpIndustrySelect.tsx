import Select from 'react-select';
import { CorpIndustry } from "@nitro-rp/renderer";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface CorpIndustrySelectProps {
    industry?: CorpIndustry;
    onChange(newIndustry: CorpIndustry): void;
}

const CORP_INDUSTRY_OPTIONS: Array<{ label: string; value: CorpIndustry }> = Object.entries(CorpIndustry).map(([key, value]) => ({ label: key, value }));

export function CorpIndustrySelect({ industry, onChange }: CorpIndustrySelectProps) {

    function onChangeIndustry(opt: any) {
        const mathingIndustry = CORP_INDUSTRY_OPTIONS.find(_ => _.key === opt.value);
        if (!mathingIndustry) {
            return;
        }
        onChange(mathingIndustry.value);
    }

    return (
        <Select
            options={CORP_INDUSTRY_OPTIONS}
            value={CORP_INDUSTRY_OPTIONS.find(option => option.value === industry)}
            onChange={onChangeIndustry}
            placeholder="Select an industry"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}