import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { AmmoCrateDataEventParser } from "../../../parser";

export class AmmoCrateDataEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, AmmoCrateDataEventParser);
    }

    public getParser(): AmmoCrateDataEventParser {
        return this.parser as AmmoCrateDataEventParser;
    }
}
