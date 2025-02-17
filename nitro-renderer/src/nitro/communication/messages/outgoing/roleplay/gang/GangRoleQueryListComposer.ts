import { IMessageComposer } from "../../../../../../api";

export class GangRoleQueryListComposer implements IMessageComposer<ConstructorParameters<typeof GangRoleQueryListComposer>> {
    private _data: ConstructorParameters<typeof GangRoleQueryListComposer>;

    constructor(gangId: number) {
        this._data = [gangId]
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}