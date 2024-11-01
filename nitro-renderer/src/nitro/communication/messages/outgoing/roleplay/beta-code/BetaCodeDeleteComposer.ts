import { IMessageComposer } from "../../../../../../api";

export class BetaCodeDeleteComposer implements IMessageComposer<ConstructorParameters<typeof BetaCodeDeleteComposer>> {
    private _data: ConstructorParameters<typeof BetaCodeDeleteComposer>;

    constructor(betaCodeId: number) {
        this._data = [betaCodeId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}