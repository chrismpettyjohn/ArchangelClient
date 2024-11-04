import { IMessageComposer } from "../../../../../../api";

export class WeaponCreateComposer implements IMessageComposer<ConstructorParameters<typeof WeaponCreateComposer>> {
    private _data: ConstructorParameters<typeof WeaponCreateComposer>;

    constructor(uniqueName: string, displayName: string, minDamage: number, maxDamage: number, rangeInTiles: number, accuracy: number, reloadTime: number, reloadMessage: string, ammoCapacity: number, weight: number, cooldownSeconds: number, equipEffect: number, equipMessage: string, unequipMessage: string, attackMessage: string) {
        this._data = [uniqueName, displayName, minDamage, maxDamage, rangeInTiles, accuracy, reloadTime, reloadMessage, ammoCapacity, weight, cooldownSeconds, equipEffect, equipMessage, unequipMessage, attackMessage];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}