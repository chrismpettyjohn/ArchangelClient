import { IMessageComposer } from "../../../../../../api";

export class BugReportDeleteComposer implements IMessageComposer<ConstructorParameters<typeof BugReportDeleteComposer>> {
    private _data: ConstructorParameters<typeof BugReportDeleteComposer>;

    constructor(bugReportId: number) {
        this._data = [bugReportId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}