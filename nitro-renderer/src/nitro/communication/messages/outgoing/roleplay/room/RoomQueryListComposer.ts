import { IMessageComposer } from "../../../../../../api";

export class RoomQueryListComposer implements IMessageComposer<ConstructorParameters<typeof RoomQueryListComposer>> {
    private _data: ConstructorParameters<typeof RoomQueryListComposer>;

    constructor() {
        this._data = [];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}