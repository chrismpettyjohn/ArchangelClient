import { TurfCaptureTimeLeftData, TurfCaptureTimeLeftEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { TurfTimerQuery } from "../../api/roleplay/gang/TurfTimerQuery";

export function useTurfTimer(): TurfCaptureTimeLeftData {
    const [timer, setTimer] = useState<TurfCaptureTimeLeftData>({
        finishesAt: -1,
        isCapturing: false,
        capturingUserId: -1,
        capturingGangId: -1,
        gangs: [],
    });

    useEffect(() => {
        TurfTimerQuery();
    }, []);

    useMessageEvent<TurfCaptureTimeLeftEvent>(TurfCaptureTimeLeftEvent, event => {
        const parser = event.getParser();
        setTimer(parser.data);
    });

    return timer;
}