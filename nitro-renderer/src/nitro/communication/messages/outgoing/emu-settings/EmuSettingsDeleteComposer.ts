import { IMessageComposer } from '../../../../../api';

export class EmuSettingsDeleteComposer implements IMessageComposer<ConstructorParameters<typeof EmuSettingsDeleteComposer>> {
    private _data: ConstructorParameters<typeof EmuSettingsDeleteComposer>;

    constructor(key: string) {
        this._data = [key];
    }

    dispose(): void {
        this._data = null;
    }

    public getMessageArray() {
        return this._data;
    }
}
