import Select from 'react-select';
import { useMemo } from "react";
import { CorpPositionListData } from "@nitro-rp/renderer";
import { useCorpPositionList } from "../../hooks/roleplay/use-corp-position-list";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface CorpPositionSelectProps {
    corpID: number;
    corpPositionID: number;
    onChange(newCorpPosition: CorpPositionListData): void;
}

export function CorpPositionSelect({ corpID, corpPositionID, onChange }: CorpPositionSelectProps) {
    const corpPositions = useCorpPositionList(corpID);
    const corpRoleOptions = useMemo(() => {
        return corpPositions.map(_ => ({
            label: _.name,
            value: _.id,
        }))
    }, [corpPositions]);

    function onChangeCorpPosition(opt: any) {
        const matchingCorpPosition = corpPositions.find(_ => _.id === Number(opt.value));
        if (!matchingCorpPosition) {
            return;
        }
        onChange(matchingCorpPosition);
    }

    return (
        <Select
            options={corpRoleOptions}
            value={corpRoleOptions.find(option => option.value === corpID)}
            onChange={onChangeCorpPosition}
            placeholder="Select a role"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}