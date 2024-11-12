import { IMessageComposer } from "../../../../../../api";

export class CorpPositionInfoQueryComposer implements IMessageComposer<ConstructorParameters<typeof CorpPositionInfoQueryComposer>> {
    private _data: ConstructorParameters<typeof CorpPositionInfoQueryComposer>;

    constructor(corpPositionID: number) {
        this._data = [corpPositionID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}