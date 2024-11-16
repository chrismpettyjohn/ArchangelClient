import { useEffect, useState } from "react";
import { GetConfiguration, SendMessageComposer } from "../../nitro";
import { CrimeData, CrimeListEvent, CrimeQueryListComposer } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../hooks";


export function useCrimes(): CrimeData[] {
    const [crimes, setCrimes] = useState<CrimeData[]>([]);

    useEffect(() => {
        SendMessageComposer(new CrimeQueryListComposer());
    }, []);

    useMessageEvent(CrimeListEvent, (event: CrimeListEvent) => {
        setCrimes(event.getParser().crimes);
    });

    return crimes
}