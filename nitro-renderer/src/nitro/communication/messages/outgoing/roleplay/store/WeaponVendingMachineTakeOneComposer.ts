import { IMessageComposer } from "../../../../../../api";

export class WeaponVendingMachineTakeOneComposer implements IMessageComposer<ConstructorParameters<typeof WeaponVendingMachineTakeOneComposer>> {
    private _data: ConstructorParameters<typeof WeaponVendingMachineTakeOneComposer>;

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