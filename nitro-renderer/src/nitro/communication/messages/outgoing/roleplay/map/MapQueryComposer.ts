import { IMessageComposer } from "../../../../../../api";

export class MapQueryComposer implements IMessageComposer<ConstructorParameters<typeof MapQueryComposer>> {
    private _data: number[];

    constructor(roomId: number, includeConnections: boolean = true) {
        this._data = [roomId, includeConnections ? 1 : 0];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}