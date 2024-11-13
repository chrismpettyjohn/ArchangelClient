import { IMessageComposer } from "../../../../../../api";

export class GangQueryManyComposer implements IMessageComposer<ConstructorParameters<typeof GangQueryManyComposer>> {
    private _data: ConstructorParameters<typeof GangQueryManyComposer>;

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