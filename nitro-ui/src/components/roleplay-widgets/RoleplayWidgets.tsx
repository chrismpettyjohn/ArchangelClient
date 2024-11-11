import { GameControls } from "./game-controls/GameControls";
import { WeaponEffects } from "./weapon-effects/WeaponEffects";
import { ReportBug } from "./report-bug/ReportBug";
import { WebsocketDisconnect } from "./websocket-disconnect/WebsocketDisconnect";
import { CorpList } from "./community-manager/corp-list/CorpList";
import { CorpProfile } from "./community-manager/corp-profile/CorpProfile";

export function RoleplayWidgets() {
    return (
        <>
            <GameControls />
            <WeaponEffects />
            <ReportBug />
            <WebsocketDisconnect />
            <CorpList />
            <CorpProfile />
        </>
    )
}