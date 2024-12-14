import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

enum ProductType {
    AMMO = "ammo",
    WEAPON = "weapon",
    ITEM = "item"
}

export interface ProductOffer {
    id: number;
    productId: number;
    productType: ProductType;
}

export class OfferStoreProductEventParser implements IMessageParser {
    private _offers: Array<ProductOffer> = [];

    public flush(): boolean {
        this._offers = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalOffers = wrapper.readInt();

        for (let i = 0; i < totalOffers; i++) {
            const [id, productId, productType] = wrapper.readString().split(';');
            this._offers.push({ id: Number(id), productId: Number(productId), productType } as any);
        }

        return true;
    }

    public get pffers(): Array<ProductOffer> {
        return this._offers;
    }

}
