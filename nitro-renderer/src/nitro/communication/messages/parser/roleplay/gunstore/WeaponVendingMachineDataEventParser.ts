import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface WeaponVendingMachineData {
    id: number;
    uniqueName: string;
    displayName: string;
}

export class WeaponVendingMachineDataEventParser implements IMessageParser {
    private _items: WeaponVendingMachineData[];

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
                displayName,
            })
        }

        return true;
    }

    public get items(): WeaponVendingMachineData[] {
        return this._items;
    }
}
