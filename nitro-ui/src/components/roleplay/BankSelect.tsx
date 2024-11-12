import Select from 'react-select';
import { useEffect, useMemo, useState } from "react";
import { BankListQuery } from "../../api/roleplay/bank/BankListQuery";
import { BankListEvent, BankListRow } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../hooks";
import { getSelectDarkTheme, SELECT_DARK_THEME } from './select.base';

export interface BankSelectProps {
    bankID?: number;
    onChange(newBank: BankListRow): void;
}

export function BankSelect({ bankID, onChange }: BankSelectProps) {
    const [banks, setBanks] = useState<Array<BankListRow>>([]);
    const bankOptions = useMemo(() => {
        return banks.map(_ => ({
            label: _.corpName,
            value: _.corpID,
        }))
    }, [banks]);

    useEffect(() => {
        BankListQuery();
    }, []);

    useMessageEvent<BankListEvent>(BankListEvent, event => {
        setBanks(event.getParser().banks);
    });

    function onChangeBank(opt: any) {
        const matchingBank = banks.find(_ => _.corpID === Number(opt.value));
        if (!matchingBank) {
            return;
        }
        onChange(matchingBank);
    }

    return (
        <Select
            options={bankOptions}
            value={bankOptions.find(option => option.value === bankID)}
            onChange={onChangeBank}
            placeholder="Select a sector"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}