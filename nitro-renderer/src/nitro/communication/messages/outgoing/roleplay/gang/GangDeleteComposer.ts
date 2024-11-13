import { IMessageComposer } from "../../../../../../api";

export class GangDeleteComposer implements IMessageComposer<ConstructorParameters<typeof GangDeleteComposer>> {
    private _data: ConstructorParameters<typeof GangDeleteComposer>;

    constructor(gangId: number) {
        this._data = [gangId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}