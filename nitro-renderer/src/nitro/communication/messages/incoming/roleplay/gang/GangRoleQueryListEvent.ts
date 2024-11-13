import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangQueryListEventParser } from "../../../parser";
import { GangRoleQueryListEventParser } from "../../../parser/roleplay/gang/GangRoleQueryListEventParser";

export class GangRoleQueryListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, GangRoleQueryListEventParser);
    }

    public getParser(): GangQueryListEventParser {
        return this.parser as GangQueryListEventParser;
    }
}
