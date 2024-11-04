import { IMessageComposer } from "../../../../../../api";

export class CorpUpdateComposer implements IMessageComposer<ConstructorParameters<typeof CorpUpdateComposer>> {
    private _data: ConstructorParameters<typeof CorpUpdateComposer>;

    constructor(corpId: number, displayName: string, description: string, badgeCode: number, roomId: number, userId: number) {
        this._data = [displayName, description, badgeCode, roomId, userId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}