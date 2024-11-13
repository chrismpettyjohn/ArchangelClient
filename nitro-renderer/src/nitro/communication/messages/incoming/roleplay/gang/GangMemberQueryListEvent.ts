import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangMemberQueryListEventParser } from "../../../parser";

export class GangMemberQueryListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, GangMemberQueryListEventParser);
    }

    public getParser(): GangMemberQueryListEventParser {
        return this.parser as GangMemberQueryListEventParser;
    }
}
