
import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { parseProductType, StoreProductType } from "./OfferStoreProductEventParser";

export interface StoreShiftInventoryData {
    productId: number;
    productType: StoreProductType;
    productName: string;
}

export class StoreShiftInventoryDataEventParser implements IMessageParser {
    private _items: StoreShiftInventoryData[];

    public flush(): boolean {
        this._items = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        try {
            if (!wrapper) return false;

            const itemCount = wrapper.readInt();

            for (let i = 0; i < itemCount; i++) {
                const [productId, productType, productName] = wrapper.readString().split(';');
                this._items.push({
                    productId: Number(productId),
                    productType: parseProductType(productType),
                    productName,
                })
            }

            return true;
        } catch (e: any) {
            console.log(e);
            throw e;
        }
    }

    public get items(): StoreShiftInventoryData[] {
        return this._items;
    }

}
