import { GangInfoData, GangQueryListComposer, GangQueryListEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { SendMessageComposer } from "../../api";

export function useGangList(): Array<GangInfoData> {
    const [gangs, setGangs] = useState<GangInfoData[]>([]);

    useEffect(() => {
        SendMessageComposer(new GangQueryListComposer());
    }, []);

    useMessageEvent<GangQueryListEvent>(GangQueryListEvent, event => {
        const parser = event.getParser();
        setGangs(parser.gangs);
    });

    return gangs;
}