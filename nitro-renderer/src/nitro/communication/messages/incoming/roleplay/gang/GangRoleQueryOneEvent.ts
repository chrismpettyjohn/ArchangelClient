import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { GangRoleQueryOneEventParser } from "../../../parser";

export class GangRoleQueryOneEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, GangRoleQueryOneEventParser);
    }

    public getParser(): GangRoleQueryOneEventParser {
        return this.parser as GangRoleQueryOneEventParser;
    }
}
