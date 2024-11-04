import { IMessageComposer } from "../../../../../../api";

export class CrimeCreateComposer implements IMessageComposer<ConstructorParameters<typeof CrimeCreateComposer>> {
    private _data: ConstructorParameters<typeof CrimeCreateComposer>;

    constructor(displayName: string, description: string, jailTime: number) {
        this._data = [displayName, description, jailTime];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}