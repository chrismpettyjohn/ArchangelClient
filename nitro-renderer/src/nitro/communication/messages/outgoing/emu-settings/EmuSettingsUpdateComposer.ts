import { IMessageComposer } from '../../../../../api';

export class EmuSettingsUpdateComposer implements IMessageComposer<ConstructorParameters<typeof EmuSettingsUpdateComposer>> {
    private _data: ConstructorParameters<typeof EmuSettingsUpdateComposer>;

    constructor(key: string, value: string) {
        this._data = [key, value];
    }

    dispose(): void {
        this._data = null;
    }

    public getMessageArray() {
        return this._data;
    }
}
