import { IMessageComposer } from "../../../../../../api";

export class BetaCodeGenerateComposer implements IMessageComposer<ConstructorParameters<typeof BetaCodeGenerateComposer>> {
    private _data: ConstructorParameters<typeof BetaCodeGenerateComposer>;

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