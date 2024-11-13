import { IMessageComposer } from "../../../../../../api";

export class GangRoleDeleteComposer implements IMessageComposer<ConstructorParameters<typeof GangRoleDeleteComposer>> {
    private _data: ConstructorParameters<typeof GangRoleDeleteComposer>;

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