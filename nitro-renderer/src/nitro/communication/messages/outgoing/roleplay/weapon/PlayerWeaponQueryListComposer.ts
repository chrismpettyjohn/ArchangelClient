import { IMessageComposer } from "../../../../../../api";

export class PlayerWeaponQueryListComposer implements IMessageComposer<ConstructorParameters<typeof PlayerWeaponQueryListComposer>> {
    private _data: ConstructorParameters<typeof PlayerWeaponQueryListComposer>;

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