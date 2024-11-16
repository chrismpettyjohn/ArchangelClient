import { IMessageComposer } from "../../../../../../api";

export class PoliceArrestComposer implements IMessageComposer<ConstructorParameters<typeof PoliceArrestComposer>> {
    private _data: ConstructorParameters<typeof PoliceArrestComposer>;

    constructor(userID: number) {
        this._data = [userID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}