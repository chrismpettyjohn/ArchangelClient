import { IMessageComposer } from "../../../../../../api";

export class GangUpdateComposer implements IMessageComposer<ConstructorParameters<typeof GangUpdateComposer>> {
    private _data: ConstructorParameters<typeof GangUpdateComposer>;

    constructor(gangId: number, displayName: string, description: string, badgeCode: string, userId: number, roomId: number) {
        this._data = [gangId, displayName, description, badgeCode, userId, roomId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}