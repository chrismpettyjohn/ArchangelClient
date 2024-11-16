import { IMessageComposer } from '../../../../../api';

export class EmuSettingsQueryListComposer implements IMessageComposer<ConstructorParameters<typeof EmuSettingsQueryListComposer>> {
    private _data: ConstructorParameters<typeof EmuSettingsQueryListComposer>;

    constructor() {
        this._data = [];
    }

    dispose(): void {
        this._data = null;
    }

    public getMessageArray() {
        return this._data;
    }
}
