import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { AmmoSize, AmmoType, parseAmmoSize, parseAmmoType } from "../combat/MyAmmoListEventParser";

export interface AmmoCrateData {
    id: number;
    uniqueName: string;
    displayName: string;
    ammoType: AmmoType;
    ammoSize: AmmoSize;
}

export class AmmoCrateDataEventParser implements IMessageParser {
    private _items: AmmoCrateData[];

    public flush(): boolean {
        this._items = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        try {
            if (!wrapper) return false;

            const itemCount = wrapper.readInt();

            for (let i = 0; i < itemCount; i++) {
                const [id, uniqueName, displayName, ammoType, ammoSize] = wrapper.readString().split(';');
                this._items.push({
                    id: Number(id),
                    uniqueName,
                    displayName,
                    ammoType: parseAmmoType(ammoType),
                    ammoSize: parseAmmoSize(ammoSize),
                })
            }

            return true;
        } catch (e: any) {
            console.log(e)
            throw e;
        }
    }

    public get items(): AmmoCrateData[] {
        return this._items;
    }
}
