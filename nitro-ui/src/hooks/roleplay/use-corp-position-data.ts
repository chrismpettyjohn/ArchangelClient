import { CorpPositionInfoData, CorpPositionInfoQueryEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { CorpPositionInfoQuery } from "../../api/roleplay/corp/CorpPositionInfoQuery";

export function useCorpPositionData(corpPositionID: number): CorpPositionInfoData {
    const [corpPositionData, setCorpPositionData] = useState<CorpPositionInfoData>({
        id: -1,
        corpID: -1,
        orderID: -1,
        displayName: '',
        description: '',
        motto: '',
        salary: -1,
        maleUniform: '',
        femaleUniform: '',
        canHire: false,
        canFire: false,
        canPromote: false,
        canDemote: false,
        canWorkAnywhere: false,
    });

    useEffect(() => {
        if (corpPositionID === corpPositionData.id) {
            return;
        }
        CorpPositionInfoQuery(corpPositionID);
    }, [corpPositionID]);

    useMessageEvent<CorpPositionInfoQueryEvent>(CorpPositionInfoQueryEvent, event => {
        const eventData: CorpPositionInfoData = event.getParser().data;
        if (eventData.id !== corpPositionID) {
            return;
        }
        setCorpPositionData(eventData);
    });

    return corpPositionData;
}
