import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { UserGuestbookQueryOneEventParser } from '../../parser';

export class UserGuestbookQueryOneEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, UserGuestbookQueryOneEventParser);
    }

    public getParser(): UserGuestbookQueryOneEventParser {
        return this.parser as UserGuestbookQueryOneEventParser;
    }
}
