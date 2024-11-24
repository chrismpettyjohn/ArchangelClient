import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { MapQueryEventParser } from "../../../parser";

export class MapQueryEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, MapQueryEventParser);
    }

    public getParser(): MapQueryEventParser {
        return this.parser as MapQueryEventParser;
    }
}
