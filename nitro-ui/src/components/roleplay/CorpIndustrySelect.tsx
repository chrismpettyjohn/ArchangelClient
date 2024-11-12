import { ChangeEvent } from "react";
import { CorpIndustry } from "@nitro-rp/renderer";

export interface CorpIndustrySelectProps {
    industry?: CorpIndustry;
    onChange(newIndustry: CorpIndustry): void;
}

const CORP_INDUSTRY_OPTIONS: Array<{ key: string; value: CorpIndustry; }> = Object.values(CorpIndustry).map(_ => ({ key: _, value: _ }))

export function CorpIndustrySelect({ industry, onChange }: CorpIndustrySelectProps) {

    function onChangeIndustry(event: ChangeEvent<HTMLSelectElement>) {
        const mathingIndustry = CORP_INDUSTRY_OPTIONS.find(_ => _.key === event.currentTarget.value);
        if (!mathingIndustry) {
            return;
        }
        onChange(mathingIndustry.value);
    }

    return (
        <select className="form-control form-control-sm" value={industry} onChange={onChangeIndustry}>
            {
                !industry && <option selected disabled>Select an industry</option>
            }
            {
                CORP_INDUSTRY_OPTIONS.map(industry => (
                    <option key={`industry_${industry.key}`} value={industry.value}>
                        {industry.value}
                    </option>
                ))
            }
        </select>
    )
}