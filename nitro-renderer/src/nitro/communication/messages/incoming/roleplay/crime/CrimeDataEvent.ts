import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { CrimeDataEventParser } from "../../../parser";

export class CrimeDataEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CrimeDataEventParser);
    }

    public getParser(): CrimeDataEventParser {
        return this.parser as CrimeDataEventParser;
    }
}
