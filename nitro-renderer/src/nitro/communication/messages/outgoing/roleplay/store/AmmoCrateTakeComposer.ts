import { IMessageComposer } from "../../../../../../api";

export class AmmoCrateTakeComposer implements IMessageComposer<ConstructorParameters<typeof AmmoCrateTakeComposer>> {
    private _data: ConstructorParameters<typeof AmmoCrateTakeComposer>;

    constructor(ammoId: number) {
        this._data = [ammoId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}