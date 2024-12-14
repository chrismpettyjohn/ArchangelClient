import { IMessageComposer } from "../../../../../../api";

export class RejectStoreProductOfferComposer implements IMessageComposer<ConstructorParameters<typeof RejectStoreProductOfferComposer>> {
    private _data: ConstructorParameters<typeof RejectStoreProductOfferComposer>;

    constructor(offerId: number) {
        this._data = [offerId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}