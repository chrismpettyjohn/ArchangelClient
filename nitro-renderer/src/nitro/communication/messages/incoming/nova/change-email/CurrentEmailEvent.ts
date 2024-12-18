import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { CurrentEmailEventParser } from '../../../parser';

export class CurrentEmailEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, CurrentEmailEventParser);
    }

    public getParser(): CurrentEmailEventParser {
        return this.parser as CurrentEmailEventParser;
    }
}
