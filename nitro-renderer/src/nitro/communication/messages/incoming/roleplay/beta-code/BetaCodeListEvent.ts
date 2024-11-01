import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { BetaCodeListEventParser } from "../../../parser";

export class BetaCodeListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, BetaCodeListEventParser);
    }

    public getParser(): BetaCodeListEventParser {
        return this.parser as BetaCodeListEventParser;
    }
}
