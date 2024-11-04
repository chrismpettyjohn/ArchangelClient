import { IMessageComposer } from "../../../../../../api";

export class CrimeQueryListComposer implements IMessageComposer<ConstructorParameters<typeof CrimeQueryListComposer>> {
    private _data: ConstructorParameters<typeof CrimeQueryListComposer>;

    constructor() {
        this._data = [];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}