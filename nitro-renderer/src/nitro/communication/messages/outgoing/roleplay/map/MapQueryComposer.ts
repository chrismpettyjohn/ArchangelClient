import { IMessageComposer } from "../../../../../../api";

export class MapQueryComposer implements IMessageComposer<ConstructorParameters<typeof MapQueryComposer>> {
    private _data: ConstructorParameters<typeof MapQueryComposer>;

    constructor(roomId: number) {
        this._data = [roomId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}