import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangRoleQueryListEventParser } from "../../../parser/roleplay/gang/GangRoleQueryListEventParser";

export class GangRoleQueryListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, GangRoleQueryListEventParser);
    }

    public getParser(): GangRoleQueryListEventParser {
        return this.parser as GangRoleQueryListEventParser;
    }
}
