import { IMessageComposer } from "../../../../../../api";

export class CrimeUpdateComposer implements IMessageComposer<ConstructorParameters<typeof CrimeUpdateComposer>> {
    private _data: ConstructorParameters<typeof CrimeUpdateComposer>;

    constructor(crimeId: number, displayName: string, description: string, jailTime: number) {
        this._data = [crimeId, displayName, description, jailTime];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}