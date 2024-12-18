import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UserProfileBannerEventParser } from '../../../parser';

export class UserProfileBannerEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, UserProfileBannerEventParser);
    }

    public getParser(): UserProfileBannerEventParser {
        return this.parser as UserProfileBannerEventParser;
    }
}
