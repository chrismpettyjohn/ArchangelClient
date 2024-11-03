import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { WeaponListEventParser } from '../../../parser';

export class WeaponListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, WeaponListEventParser);
    }

    public getParser(): WeaponListEventParser {
        return this.parser as WeaponListEventParser;
    }
}
