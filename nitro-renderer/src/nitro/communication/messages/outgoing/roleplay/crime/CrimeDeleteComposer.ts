import { IMessageComposer } from "../../../../../../api";

export class CrimeDeleteComposer implements IMessageComposer<ConstructorParameters<typeof CrimeDeleteComposer>> {
    private _data: ConstructorParameters<typeof CrimeDeleteComposer>;

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