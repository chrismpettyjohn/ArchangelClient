import { ChangeEvent, useEffect, useState } from "react";
import { BankListQuery } from "../../api/roleplay/bank/BankListQuery";
import { BankListEvent, BankListRow } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../hooks";

export interface BankSelectProps {
    bankID?: number;
    onChange(newBank: BankListRow): void;
}

export function BankSelect({ bankID, onChange }: BankSelectProps) {
    const [banks, setBanks] = useState<Array<BankListRow>>([]);

    useEffect(() => {
        BankListQuery();
    }, []);

    useMessageEvent<BankListEvent>(BankListEvent, event => {
        setBanks(event.getParser().banks);
    });

    function onChangeBank(event: ChangeEvent<HTMLSelectElement>) {
        const matchingBank = banks.find(_ => _.corpID === Number(event.currentTarget.value));
        if (!matchingBank) {
            return;
        }
        onChange(matchingBank);
    }

    return (
        <select className="form-control form-control-sm" value={bankID} onChange={onChangeBank}>
            {
                !bankID && <option selected disabled>Select a bank</option>
            }
            {
                banks.map(bank => (
                    <option key={`bank_${bank.corpID}`} value={bank.corpID}>
                        {bank.corpName}
                    </option>
                ))
            }
        </select>
    )
}