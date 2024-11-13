import { IMessageComposer } from "../../../../../../api";

export class GangRoleQueryOneComposer implements IMessageComposer<ConstructorParameters<typeof GangRoleQueryOneComposer>> {
    private _data: ConstructorParameters<typeof GangRoleQueryOneComposer>;

    constructor(gangRoleId: number) {
        this._data = [gangRoleId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}