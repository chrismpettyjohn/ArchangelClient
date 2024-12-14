import { IMessageComposer } from "../../../../../../api";

export class CreateStoreProductOfferComposer implements IMessageComposer<ConstructorParameters<typeof CreateStoreProductOfferComposer>> {
    private _data: ConstructorParameters<typeof CreateStoreProductOfferComposer>;

    constructor(productId: number) {
        this._data = [productId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}