import { IMessageComposer } from "../../../../../../api";

export class PlayerWeaponQueryListComposer implements IMessageComposer<ConstructorParameters<typeof PlayerWeaponQueryListComposer>> {
    private _data: ConstructorParameters<typeof PlayerWeaponQueryListComposer>;

    constructor(private readonly userId: number) {
        this._data = [userId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}