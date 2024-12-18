import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { ChangePasswordSuccessEventParser } from '../../../parser';


export class ChangePasswordSuccessEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, ChangePasswordSuccessEventParser);
    }

    public getParser(): ChangePasswordSuccessEventParser {
        return this.parser as ChangePasswordSuccessEventParser;
    }
}
