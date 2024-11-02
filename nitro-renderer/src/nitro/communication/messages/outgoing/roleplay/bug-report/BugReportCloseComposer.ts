import { IMessageComposer } from "../../../../../../api";

export class BugReportCloseComposer implements IMessageComposer<ConstructorParameters<typeof BugReportCloseComposer>> {
    private _data: ConstructorParameters<typeof BugReportCloseComposer>;

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