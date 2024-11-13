import { IMessageComposer } from "../../../../../../api";

export class GangQueryListComposer implements IMessageComposer<ConstructorParameters<typeof GangQueryListComposer>> {
    private _data: ConstructorParameters<typeof GangQueryListComposer>;

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