import React, { useEffect } from 'react';
import { useCashRegister } from '../../../../hooks/roleplay/use-open-cash-register';

export function CashRegister() {
    const cashRegister = useCashRegister();

    useEffect(() => {
        if (!cashRegister) {
            return;
        }
        alert(cashRegister)
    }, [cashRegister]);

    if (!cashRegister) {
        return null;
    }

    return (
        <>
            cash register
        </>
    )
}