import Select from 'react-select';
import { useMemo } from "react";
import { CorpListData } from "@nitro-rp/renderer";
import { useCorpList } from "../../hooks/roleplay/use-corp-list";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface CorpSelectProps {
    corpID: number;
    onChange(newCorp: CorpListData): void;
}

export function CorpSelect({ corpID, onChange }: CorpSelectProps) {
    const corps = useCorpList();
    const corpOptions = useMemo(() => {
        return corps.map(_ => ({
            label: _.displayName,
            value: _.id,
        }))
    }, [corps]);

    function onChangeCorp(opt: any) {
        const matchingCorp = corps.find(_ => _.id === Number(opt.value));
        if (!matchingCorp) {
            return;
        }
        onChange(matchingCorp);
    }

    return (
        <Select
            options={corpOptions}
            value={corpOptions.find(option => option.value === corpID)}
            onChange={onChangeCorp}
            placeholder="Select a corp"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}