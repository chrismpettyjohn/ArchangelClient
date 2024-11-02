import { IMessageComposer } from "../../../../../../api";

export class BugReportCreateComposer implements IMessageComposer<ConstructorParameters<typeof BugReportCreateComposer>> {
    private _data: ConstructorParameters<typeof BugReportCreateComposer>;

    constructor(displayName: string, content: string) {
        this._data = [displayName, content];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}