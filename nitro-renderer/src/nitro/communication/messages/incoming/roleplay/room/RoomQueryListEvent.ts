import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { RoomQueryListEventParser } from "../../../parser";

export class RoomQueryListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, RoomQueryListEventParser);
    }

    public getParser(): RoomQueryListEventParser {
        return this.parser as RoomQueryListEventParser;
    }
}
