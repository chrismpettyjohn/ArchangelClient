import { IMessageComposer } from "../../../../../../api";

export class GangRoleCreateComposer implements IMessageComposer<ConstructorParameters<typeof GangRoleCreateComposer>> {
    private _data: ConstructorParameters<typeof GangRoleCreateComposer>;

    constructor(gangId: number, name: string, canInvite: boolean, canKick: boolean) {
        this._data = [gangId, name, canInvite, canKick];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}