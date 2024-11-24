import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { TaxiStandEventParser } from "../../../parser/roleplay/taxi/TaxiStandEventParser";

export class TaxiStandEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, TaxiStandEventParser);
    }

    public getParser(): TaxiStandEventParser {
        return this.parser as TaxiStandEventParser;
    }
}
