import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangQueryListEventParser } from "../../../parser";

export class GangQueryListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, GangQueryListEventParser);
    }

    public getParser(): GangQueryListEventParser {
        return this.parser as GangQueryListEventParser;
    }
}
