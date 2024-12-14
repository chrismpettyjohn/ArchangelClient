import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { StoreShiftInventoryDataEventParser } from "../../../parser";

export class StoreShiftInventoryDataEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, StoreShiftInventoryDataEventParser);
    }

    public getParser(): StoreShiftInventoryDataEventParser {
        return this.parser as StoreShiftInventoryDataEventParser;
    }
}
