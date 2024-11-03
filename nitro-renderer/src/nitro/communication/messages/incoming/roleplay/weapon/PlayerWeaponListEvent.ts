import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { PlayerWeaponListEventParser } from '../../../parser';

export class PlayerWeaponListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, PlayerWeaponListEventParser);
    }

    public getParser(): PlayerWeaponListEventParser {
        return this.parser as PlayerWeaponListEventParser;
    }
}
