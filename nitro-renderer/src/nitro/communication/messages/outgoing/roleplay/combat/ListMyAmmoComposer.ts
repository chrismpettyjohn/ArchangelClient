import { IMessageComposer } from "../../../../../../api";

export class ListMyAmmoComposer implements IMessageComposer<ConstructorParameters<typeof ListMyAmmoComposer>> {
    private _data: ConstructorParameters<typeof ListMyAmmoComposer>;

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