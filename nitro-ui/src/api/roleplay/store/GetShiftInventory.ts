import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../nitro";
import { ShiftInventoryQueryComposer, StoreShiftInventoryData, StoreShiftInventoryDataEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../hooks";


export function useShiftInventory(): StoreShiftInventoryData[] {
    const [inventory, setInventory] = useState<StoreShiftInventoryData[]>([]);

    useEffect(() => {
        SendMessageComposer(new ShiftInventoryQueryComposer());
    }, []);

    useMessageEvent(StoreShiftInventoryDataEvent, (event: StoreShiftInventoryDataEvent) => {
        setInventory(event.getParser().items);
    });

    return inventory
}