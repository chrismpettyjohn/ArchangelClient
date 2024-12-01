import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { MyAmmoListEventParser } from "../../../parser";

export class MyAmmoListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, MyAmmoListEventParser);
    }

    public getParser(): MyAmmoListEventParser {
        return this.parser as MyAmmoListEventParser;
    }
}
