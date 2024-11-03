import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { WeaponDataEventParser } from '../../../parser';

export class WeaponDataEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, WeaponDataEventParser);
    }

    public getParser(): WeaponDataEventParser {
        return this.parser as WeaponDataEventParser;
    }
}
