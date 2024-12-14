import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

enum ProductType {
    AMMO = "ammo",
    WEAPON = "weapon",
    ITEM = "item"
}

export interface StoreProductOffer {
    id: number;
    productId: number;
    productType: ProductType;
}

export class OfferStoreProductEventParser implements IMessageParser {
    private _id: number;
    private _productId: number;
    private _productType: ProductType;

    public flush(): boolean {
        this._id = -1;
        this._productId = -1;
        this._productType = ProductType.ITEM;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._productId = wrapper.readInt();
        this._productType = wrapper.readString() as ProductType;

        return true;
    }

    public get offer(): StoreProductOffer {
        return {
            id: this._id,
            productId: this._productId,
            productType: this._productType,
        };
    }

}
