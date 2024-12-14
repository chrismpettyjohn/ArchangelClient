import { IMessageComposer } from "../../../../../../api";

export class ShiftInventoryQueryComposer implements IMessageComposer<ConstructorParameters<typeof ShiftInventoryQueryComposer>> {
    private _data: ConstructorParameters<typeof ShiftInventoryQueryComposer>;

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