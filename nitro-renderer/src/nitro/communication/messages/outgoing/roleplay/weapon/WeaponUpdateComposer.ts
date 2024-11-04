import { IMessageComposer } from "../../../../../../api";

export class WeaponUpdateComposer implements IMessageComposer<ConstructorParameters<typeof WeaponUpdateComposer>> {
    private _data: ConstructorParameters<typeof WeaponUpdateComposer>;

    constructor(weaponId: number, uniqueName: string, displayName: string, minDamage: number, maxDamage: number, rangeInTiles: number, accuracy: number, reloadTime: number, reloadMessage: string, ammoCapacity: number, weight: number, cooldownSeconds: number, equipEffect: number, equipMessage: string, unequipMessage: string, attackMessage: string) {
        this._data = [weaponId, uniqueName, displayName, minDamage, maxDamage, rangeInTiles, accuracy, reloadTime, reloadMessage, ammoCapacity, weight, cooldownSeconds, equipEffect, equipMessage, unequipMessage, attackMessage];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}