import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { UserGuestbookQueryListEventParser } from '../../parser';

export class UserGuestbookQueryListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, UserGuestbookQueryListEventParser);
    }

    public getParser(): UserGuestbookQueryListEventParser {
        return this.parser as UserGuestbookQueryListEventParser;
    }
}
