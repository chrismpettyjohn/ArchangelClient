import { useCallback } from "react"
import { Text } from "../../../../common";
import { useSessionInfo } from "../../../../hooks";
import { useRoleplayStats } from "../../../../hooks/roleplay/use-rp-stats";
import { SendMessageComposer } from "../../../../api";
import { TogglePassiveModeComposer } from "@nitro-rp/renderer";

export function GamePanel() {
    const { userInfo } = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userId);

    const onTogglePassiveMode = useCallback(() => {
        SendMessageComposer(new TogglePassiveModeComposer(!rpStats.passiveMode))
    }, [rpStats.passiveMode]);

    return (
        <>
            <Text bold fontSize={4} variant="white">Passive Mode</Text>
            <br />
            <Text fontSize={6} variant="white">In passive mode, you can't take damage, but some features are unavailable to passive players.</Text>
            <select className="form-control" onChange={onTogglePassiveMode}>
                <option selected={rpStats.passiveMode}>Enabled</option>
                <option selected={!rpStats.passiveMode}>Disabled</option>
            </select>
        </>
    )
}