import { IMessageComposer } from "../../../../../../api";

export class GangRoleCreateComposer implements IMessageComposer<ConstructorParameters<typeof GangRoleCreateComposer>> {
    private _data: ConstructorParameters<typeof GangRoleCreateComposer>;

    constructor(gangId: number, orderId: number, name: string, canInvite: boolean, canKick: boolean) {
        this._data = [gangId, orderId, name, canInvite, canKick];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}