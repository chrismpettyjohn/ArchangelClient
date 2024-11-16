import { IMessageComposer } from "../../../../../../api";

export class WantedListAddUserComposer implements IMessageComposer<ConstructorParameters<typeof WantedListAddUserComposer>> {
    private _data: ConstructorParameters<typeof WantedListAddUserComposer>;

    constructor(username: string, crimeID: number) {
        this._data = [username, crimeID]
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}