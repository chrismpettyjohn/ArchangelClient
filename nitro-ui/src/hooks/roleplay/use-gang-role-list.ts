import { GangRoleData, GangRoleQueryListComposer, GangRoleQueryListEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { SendMessageComposer } from "../../api";

export function useGangRoleList(gangId: number): Array<GangRoleData> {
    const [gangs, setGangs] = useState<GangRoleData[]>([]);

    useEffect(() => {
        SendMessageComposer(new GangRoleQueryListComposer(gangId))
    }, [gangId]);

    useMessageEvent<GangRoleQueryListEvent>(GangRoleQueryListEvent, event => {
        const parser = event.getParser();
        setGangs(parser.roles);
    });

    return gangs;
}