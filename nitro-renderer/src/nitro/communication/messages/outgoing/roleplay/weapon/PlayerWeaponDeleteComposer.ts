import { IMessageComposer } from "../../../../../../api";

export class PlayerWeaponDeleteComposer implements IMessageComposer<ConstructorParameters<typeof PlayerWeaponDeleteComposer>> {
    private _data: ConstructorParameters<typeof PlayerWeaponDeleteComposer>;

    constructor(playerWeaponId: number) {
        this._data = [playerWeaponId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}