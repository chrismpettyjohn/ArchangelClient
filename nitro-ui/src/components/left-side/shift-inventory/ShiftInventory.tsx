import './ShiftInventory.scss';
import { Text } from "../../../common";
import { useSessionInfo } from "../../../hooks";
import { useRoleplayStats } from '../../../hooks/roleplay/use-rp-stats';
import { useShiftInventory } from '../../../api/roleplay/store/GetShiftInventory';

export function ShiftInventory() {
    const sessionInfo = useSessionInfo();
    const shiftInventory = useShiftInventory();
    const rpStats = useRoleplayStats(sessionInfo?.userInfo?.userId);

    if (!rpStats.isWorking) {
        return;
    }

    return (
        <div className="shift-inventory glass-panel">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 45px)", gap: 10, justifyContent: "center", padding: 10 }}>
                {shiftInventory.map(item => (
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
