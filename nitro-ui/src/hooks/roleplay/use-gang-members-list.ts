import { GangMemberData, GangMemberQueryListEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { SendMessageComposer } from "../../api";
import { GangMemberQueryListComposer } from "@nitro-rp/renderer/src/nitro/communication/messages/outgoing/roleplay/gang/GangMemberQueryListComposer";

export function useGangMembers(gangId: number): Array<GangMemberData> {
    const [gangs, setGangs] = useState<GangMemberData[]>([]);

    useEffect(() => {
        SendMessageComposer(new GangMemberQueryListComposer(gangId))
    }, [gangId]);

    useMessageEvent<GangMemberQueryListEvent>(GangMemberQueryListEvent, event => {
        const parser = event.getParser();
        setGangs(parser.members);
    });

    return gangs;
}