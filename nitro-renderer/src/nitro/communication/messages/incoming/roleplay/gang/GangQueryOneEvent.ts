import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangQueryOneEventParser } from "../../../parser";

export class GangQueryOneEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, GangQueryOneEventParser);
    }

    public getParser(): GangQueryOneEventParser {
        return this.parser as GangQueryOneEventParser;
    }
}
