import { GangRoleData, GangRoleQueryOneComposer, GangRoleQueryOneEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { SendMessageComposer } from "../../api";

export function useGangRoleData(gangRoleId: number): GangRoleData {
    const [gangData, setGangData] = useState<GangRoleData>({
        id: -1,
        gangId: -1,
        orderId: -1,
        displayName: '',
        canInvite: false,
        canKick: false,
        memberCount: -1,
    });

    useEffect(() => {
        SendMessageComposer(new GangRoleQueryOneComposer(gangRoleId));
    }, [gangRoleId]);

    useMessageEvent<GangRoleQueryOneEvent>(GangRoleQueryOneEvent, event => {
        const eventData: GangRoleData = event.getParser().role;
        if (eventData.id !== gangRoleId) {
            return;
        }
        setGangData(eventData);
    });

    return gangData;
}