import './ShiftInventory.scss';
import { useState } from "react";
import { Text } from "../../../common";
import { useMessageEvent, useSessionInfo } from "../../../hooks";
import { StoreShiftInventoryData, StoreShiftInventoryDataEvent } from "@nitro-rp/renderer";
import { useRoleplayStats } from '../../../hooks/roleplay/use-rp-stats';

export function ShiftInventory() {
    const [inventory, setInventory] = useState<StoreShiftInventoryData[]>([]);
    const sessionInfo = useSessionInfo();
    const rpStats = useRoleplayStats(sessionInfo?.userInfo?.userId);

    useMessageEvent<StoreShiftInventoryDataEvent>(StoreShiftInventoryDataEvent, event => {
        setInventory(event.getParser().items);
    });

    if (!rpStats.isWorking) {
        return;
    }

    return (
        <div className="shift-inventory glass-panel">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 45px)", gap: 10, justifyContent: "center", padding: 10 }}>
                {inventory.map(item => (
                    <div
                        key={item.productId}
                        style={{
                            width: 45,
                            height: 45,
                            backgroundColor: "red",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #aaa",
                            borderRadius: 4,
                            padding: 10,
                        }}
                    >
                        <Text variant="white" fontSize={6}>{item.productName}</Text>
                    </div>
                ))}
            </div>
        </div>
    );
}
