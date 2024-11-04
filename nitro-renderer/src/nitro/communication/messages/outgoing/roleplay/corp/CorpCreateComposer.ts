import { IMessageComposer } from "../../../../../../api";

export class CorpCreateComposer implements IMessageComposer<ConstructorParameters<typeof CorpCreateComposer>> {
    private _data: ConstructorParameters<typeof CorpCreateComposer>;

    constructor(displayName: string, description: string, badgeCode: number, roomId: number, userId: number) {
        this._data = [displayName, description, badgeCode, roomId, userId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}