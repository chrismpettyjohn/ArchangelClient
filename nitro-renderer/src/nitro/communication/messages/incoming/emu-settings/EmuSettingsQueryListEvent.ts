import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { EmuSettingsQueryListEventParser } from '../../parser';

export class EmuSettingsQueryListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, EmuSettingsQueryListEventParser);
    }

    public getParser(): EmuSettingsQueryListEventParser {
        return this.parser as EmuSettingsQueryListEventParser;
    }
}
