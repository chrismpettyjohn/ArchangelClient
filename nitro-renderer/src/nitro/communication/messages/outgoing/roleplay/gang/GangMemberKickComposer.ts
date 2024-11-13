import { IMessageComposer } from "../../../../../../api";

export class GangMemberKickComposer implements IMessageComposer<ConstructorParameters<typeof GangMemberKickComposer>> {
    private _data: ConstructorParameters<typeof GangMemberKickComposer>;

    constructor(gangId: number, username: string) {
        this._data = [gangId, username];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}