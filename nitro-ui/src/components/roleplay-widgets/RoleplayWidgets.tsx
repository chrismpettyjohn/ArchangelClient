import { GameControls } from "./game-controls/GameControls";
import { WeaponEffects } from "./weapon-effects/WeaponEffects";
import { CommunityManager } from "./community-manager/CommunityManager";
import { ReportBug } from "./report-bug/ReportBug";
import { WebsocketDisconnect } from "./websocket-disconnect/WebsocketDisconnect";

export function RoleplayWidgets() {
    return (
        <>
            <GameControls />
            <WeaponEffects />
            <CommunityManager />
            <ReportBug />
            <WebsocketDisconnect />
        </>
    )
}