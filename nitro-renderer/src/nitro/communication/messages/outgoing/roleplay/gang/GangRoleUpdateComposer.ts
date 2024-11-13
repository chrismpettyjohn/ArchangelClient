import { IMessageComposer } from "../../../../../../api";

export class GangRoleUpdateComposer implements IMessageComposer<ConstructorParameters<typeof GangRoleUpdateComposer>> {
    private _data: ConstructorParameters<typeof GangRoleUpdateComposer>;

    constructor(gangRoleId: number, orderId: number, name: string, canInvite: boolean, canKick: boolean) {
        this._data = [gangRoleId, orderId, name, canInvite, canKick];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}