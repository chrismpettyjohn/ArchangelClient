import { IMessageComposer } from "../../../../../../api";

export class CrimeQueryOneComposer implements IMessageComposer<ConstructorParameters<typeof CrimeQueryOneComposer>> {
    private _data: ConstructorParameters<typeof CrimeQueryOneComposer>;

    constructor(crimeId: number) {
        this._data = [crimeId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}