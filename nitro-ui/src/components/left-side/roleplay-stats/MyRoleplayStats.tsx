import { useRoom, useSessionInfo } from "../../../hooks";
import { RoleplayStatsContainer } from "./roleplay-stats-container/RoleplayStatsContainer";

export function MyRoleplayStats() {
    const { roomSession } = useRoom();
    const { userInfo } = useSessionInfo();
    if (!roomSession || !userInfo?.userId) {
        return null;
    }
    return <RoleplayStatsContainer userID={userInfo.userId} />
}