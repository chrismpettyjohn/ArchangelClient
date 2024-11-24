import { IMessageComposer } from "../../../../../../api";

export class CancelTaxiComposer implements IMessageComposer<ConstructorParameters<typeof CancelTaxiComposer>> {
    private _data: ConstructorParameters<typeof CancelTaxiComposer>;

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