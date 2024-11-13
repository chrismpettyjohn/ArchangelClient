import { IMessageComposer } from "../../../../../../api";

export class GangMemberQueryListComposer implements IMessageComposer<ConstructorParameters<typeof GangMemberQueryListComposer>> {
    private _data: ConstructorParameters<typeof GangMemberQueryListComposer>;

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