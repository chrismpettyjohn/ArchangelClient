import { GangInfoData } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { GangQueryOne } from "../../api/roleplay/gang/GangInfoQuery";
import { GangQueryOneEvent } from "@nitro-rp/renderer/src/nitro/communication/messages/incoming/roleplay/gang/GangQueryOneEvent";

export function useGangData(gangID: number): GangInfoData {
    const [gangData, setGangData] = useState<GangInfoData>({
        id: -1,
        displayName: '',
        description: '',
        badgeCode: '',
        userID: -1,
        roomID: -1,
        memberCount: -1,
    });

    useEffect(() => {
        if (!gangID) return;
        GangQueryOne(gangID);
    }, [gangID]);

    useMessageEvent<GangQueryOneEvent>(GangQueryOneEvent, event => {
        const eventData: GangInfoData = event.getParser().gang;
        if (eventData.id !== gangID) {
            return;
        }
        setGangData(eventData);
    });

    return gangData;
}