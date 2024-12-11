import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { MapQueryParser } from '../../../parser/roleplay/map/MapQueryParser';

export class MapQueryEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, MapQueryParser);
    }

    public getParser(): MapQueryParser {
        return this.parser as MapQueryParser;
    }
}