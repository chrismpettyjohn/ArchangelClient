import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { BugReportDataEventParser } from "../../../parser";

export class BugReportDataEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, BugReportDataEventParser);
    }

    public getParser(): BugReportDataEventParser {
        return this.parser as BugReportDataEventParser;
    }
}
