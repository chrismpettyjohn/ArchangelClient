import { IMessageComposer } from "../../../../../../api";

export class CorpDeletePositionComposer implements IMessageComposer<ConstructorParameters<typeof CorpDeletePositionComposer>> {
    private _data: ConstructorParameters<typeof CorpDeletePositionComposer>;

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