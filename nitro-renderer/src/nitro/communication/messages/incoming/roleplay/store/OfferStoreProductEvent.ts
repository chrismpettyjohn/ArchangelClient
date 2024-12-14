import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { OfferStoreProductEventParser } from "../../../parser";

export class OfferStoreProductEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, OfferStoreProductEventParser);
    }

    public getParser(): OfferStoreProductEventParser {
        return this.parser as OfferStoreProductEventParser;
    }
}
