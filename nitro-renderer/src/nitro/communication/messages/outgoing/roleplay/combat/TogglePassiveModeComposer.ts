import { IMessageComposer } from "../../../../../../api";

export class TogglePassiveModeComposer implements IMessageComposer<ConstructorParameters<typeof TogglePassiveModeComposer>> {
    private _data: ConstructorParameters<typeof TogglePassiveModeComposer>;

    constructor(passiveMode: boolean) {
        this._data = [passiveMode];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}