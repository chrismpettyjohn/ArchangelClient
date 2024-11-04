import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CrimeListEventParser } from "../../../parser";

export class CrimeListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CrimeListEventParser);
    }

    public getParser(): CrimeListEventParser {
        return this.parser as CrimeListEventParser;
    }
}
