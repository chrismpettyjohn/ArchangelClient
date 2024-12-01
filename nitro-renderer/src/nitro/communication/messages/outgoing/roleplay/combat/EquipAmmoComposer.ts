import { IMessageComposer } from "../../../../../../api";

export class EquipAmmoComposer implements IMessageComposer<ConstructorParameters<typeof EquipAmmoComposer>> {
    private _data: ConstructorParameters<typeof EquipAmmoComposer>;

    constructor(playerAmmoId: number) {
        this._data = [playerAmmoId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}