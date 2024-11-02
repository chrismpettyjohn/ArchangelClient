import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { BugReportListEventParser } from "../../../parser";

export class BugReportListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, BugReportListEventParser);
    }

    public getParser(): BugReportListEventParser {
        return this.parser as BugReportListEventParser;
    }
}
