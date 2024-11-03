import { IMessageComposer } from "../../../../../../api";

export class WeaponQueryOneComposer implements IMessageComposer<ConstructorParameters<typeof WeaponQueryOneComposer>> {
    private _data: ConstructorParameters<typeof WeaponQueryOneComposer>;

    constructor(weaponId: number) {
        this._data = [weaponId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}