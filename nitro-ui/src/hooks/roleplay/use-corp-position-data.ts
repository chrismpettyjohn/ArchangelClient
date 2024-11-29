import { CorpPositionInfoData, CorpPositionInfoQueryEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { CorpPositionInfoQuery } from "../../api/roleplay/corp/CorpPositionInfoQuery";

export function useCorpPositionData(corpPositionID: number): CorpPositionInfoData | undefined {
    const [corpPositionData, setCorpPositionData] = useState<CorpPositionInfoData>(undefined);

    useEffect(() => {
        if (!corpPositionID) return;
        CorpPositionInfoQuery(corpPositionID);
    }, [corpPositionID, corpPositionData]);

    useMessageEvent<CorpPositionInfoQueryEvent>(CorpPositionInfoQueryEvent, event => {
        const eventData: CorpPositionInfoData = event.getParser().data;
        if (eventData.id !== corpPositionID) {
            return;
        }
        setCorpPositionData(eventData);
    });

    return corpPositionData;
}
