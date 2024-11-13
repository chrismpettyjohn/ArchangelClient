import { IMessageComposer } from "../../../../../../api";

export class GangQueryOneComposer implements IMessageComposer<ConstructorParameters<typeof GangQueryOneComposer>> {
    private _data: ConstructorParameters<typeof GangQueryOneComposer>;

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