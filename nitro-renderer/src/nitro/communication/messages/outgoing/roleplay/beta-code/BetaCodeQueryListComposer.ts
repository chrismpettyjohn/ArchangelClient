import { IMessageComposer } from "../../../../../../api";

export class BetaCodeQueryListComposer implements IMessageComposer<ConstructorParameters<typeof BetaCodeQueryListComposer>> {
    private _data: ConstructorParameters<typeof BetaCodeQueryListComposer>;

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