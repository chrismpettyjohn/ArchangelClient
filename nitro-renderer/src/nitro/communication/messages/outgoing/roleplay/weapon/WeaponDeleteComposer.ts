import { IMessageComposer } from "../../../../../../api";

export class WeaponDeleteComposer implements IMessageComposer<ConstructorParameters<typeof WeaponDeleteComposer>> {
    private _data: ConstructorParameters<typeof WeaponDeleteComposer>;

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