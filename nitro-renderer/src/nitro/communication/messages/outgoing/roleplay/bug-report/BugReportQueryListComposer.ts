import { IMessageComposer } from "../../../../../../api";

export class BugReportQueryListComposer implements IMessageComposer<ConstructorParameters<typeof BugReportQueryListComposer>> {
    private _data: ConstructorParameters<typeof BugReportQueryListComposer>;

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