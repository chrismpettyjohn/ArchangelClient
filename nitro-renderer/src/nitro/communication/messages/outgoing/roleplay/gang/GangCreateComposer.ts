import { IMessageComposer } from "../../../../../../api";

export class GangCreateComposer implements IMessageComposer<ConstructorParameters<typeof GangCreateComposer>> {
    private _data: ConstructorParameters<typeof GangCreateComposer>;

    constructor(displayName: string, description: string, badgeCode: string, userId: number, roomId: number) {
        this._data = [displayName, description, badgeCode, userId, roomId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}