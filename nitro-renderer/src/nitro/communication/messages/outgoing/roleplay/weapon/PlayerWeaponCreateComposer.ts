import { IMessageComposer } from "../../../../../../api";

export class PlayerWeaponCreateComposer implements IMessageComposer<ConstructorParameters<typeof PlayerWeaponCreateComposer>> {
    private _data: ConstructorParameters<typeof PlayerWeaponCreateComposer>;

    constructor(weaponId: number, userId: number) {
        this._data = [weaponId, userId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}