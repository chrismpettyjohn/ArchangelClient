import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface AmmoCrateData {
    id: number;
    uniqueName: string;
    displayName: string;
}

export class AmmoCrateDataEventParser implements IMessageParser {
    private _items: AmmoCrateData[];

    public flush(): boolean {
        this._items = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const itemCount = wrapper.readInt();

        for (let i = 0; i < itemCount; i++) {
            const [id, uniqueName, displayName] = wrapper.readString().split(';');
            this._items.push({
                id: Number(id),
                uniqueName,
                displayName
            })
        }

        return true;
    }

    public get items(): AmmoCrateData[] {
        return this._items;
    }
}
