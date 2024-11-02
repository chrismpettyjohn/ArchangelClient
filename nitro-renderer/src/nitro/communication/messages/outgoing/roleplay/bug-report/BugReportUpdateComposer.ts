import { IMessageComposer } from "../../../../../../api";

export class BugReportUpdateComposer implements IMessageComposer<ConstructorParameters<typeof BugReportUpdateComposer>> {
    private _data: ConstructorParameters<typeof BugReportUpdateComposer>;

    constructor(bugReportId: number, displayName: string, content: string) {
        this._data = [bugReportId, displayName, content];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}