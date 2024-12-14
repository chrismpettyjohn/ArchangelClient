import { IMessageComposer } from "../../../../../../api";

export class AcceptStoreProductOfferComposer implements IMessageComposer<ConstructorParameters<typeof AcceptStoreProductOfferComposer>> {
    private _data: ConstructorParameters<typeof AcceptStoreProductOfferComposer>;

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