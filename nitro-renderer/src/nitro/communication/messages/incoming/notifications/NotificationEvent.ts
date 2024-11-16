import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { NotificationEventParser } from '../../parser';

export class NotificationEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, NotificationEventParser);
    }

    public getParser(): NotificationEventParser {
        return this.parser as NotificationEventParser;
    }
}
