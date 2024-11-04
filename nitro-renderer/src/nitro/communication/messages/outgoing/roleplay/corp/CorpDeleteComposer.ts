import { IMessageComposer } from "../../../../../../api";

export class CorpDeleteComposer implements IMessageComposer<ConstructorParameters<typeof CorpDeleteComposer>> {
    private _data: ConstructorParameters<typeof CorpDeleteComposer>;

    constructor(corpId: number) {
        this._data = [corpId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}