import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export interface EmuSettings { key: string; value: string }

export class EmuSettingsQueryListEventParser implements IMessageParser {
    private _settings: EmuSettings[] = [];

    public flush(): boolean {
        this._settings = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        let totalSettings = wrapper.readInt();

        while (totalSettings > 0) {
            const [key, value] = wrapper.readString().split('=');
            this._settings.push({ key, value })

            totalSettings--;
        }

        return true;
    }

    public get settings(): EmuSettings[] {
        return this._settings;
    }
}
