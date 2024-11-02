import { IMessageComposer } from "../../../../../../api";

export class BugReportQueryOneComposer implements IMessageComposer<ConstructorParameters<typeof BugReportQueryOneComposer>> {
    private _data: ConstructorParameters<typeof BugReportQueryOneComposer>;

    constructor() {
        this._data = [];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}