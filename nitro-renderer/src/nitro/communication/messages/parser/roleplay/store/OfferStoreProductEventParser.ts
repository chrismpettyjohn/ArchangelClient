import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export enum StoreProductType {
    AMMO = "ammo",
    WEAPON = "weapon",
    ITEM = "item"
}

export interface StoreProductOffer {
    id: number;
    productId: number;
    productType: StoreProductType;
    productCost: number;
    productName: string;
    productKey: string;
}

export class OfferStoreProductEventParser implements IMessageParser {
    private _id: number;
    private _productId: number;
    private _productType: StoreProductType;
    private _productCost: number;
    private _productName: string;
    private _productKey: string;

    public flush(): boolean {
        this._id = -1;
        this._productId = -1;
        this._productType = StoreProductType.ITEM;
        this._productCost = -1;
        this._productName = '';
        this._productKey = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._productId = wrapper.readInt();
        this._productType = parseProductType(wrapper.readString())
        this._productCost = wrapper.readInt();
        this._productName = wrapper.readString();
        this._productKey = wrapper.readString();

        return true;
    }

    public get offer(): StoreProductOffer {
        return {
            id: this._id,
            productId: this._productId,
            productType: this._productType,
            productCost: this._productCost,
            productName: this._productName,
            productKey: this._productKey,
        };
    }

}

export function parseProductType(type: string): StoreProductType | null {
    if (Object.values(StoreProductType).includes(type as StoreProductType)) {
        return type as StoreProductType;
    } else {
        console.error(`Invalid product type: ${type}`);
        return null;
    }
}
