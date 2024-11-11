import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { PlayerQueryListEventParser } from "../../../parser";

export class PlayerQueryListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, PlayerQueryListEventParser);
    }

    public getParser(): PlayerQueryListEventParser {
        return this.parser as PlayerQueryListEventParser;
    }
}
