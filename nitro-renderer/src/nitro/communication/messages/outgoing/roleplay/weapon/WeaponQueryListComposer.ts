import { IMessageComposer } from "../../../../../../api";

export class WeaponQueryListComposer implements IMessageComposer<ConstructorParameters<typeof WeaponQueryListComposer>> {
    private _data: ConstructorParameters<typeof WeaponQueryListComposer>;

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