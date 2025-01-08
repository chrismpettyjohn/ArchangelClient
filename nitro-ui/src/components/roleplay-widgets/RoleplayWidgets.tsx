import { GameControls } from "./game-controls/GameControls";
import { WeaponEffects } from "./weapon-effects/WeaponEffects";
import { WebsocketDisconnect } from "./websocket-disconnect/WebsocketDisconnect";
import { CorpManager } from "./community-manager/corp/CorpManager";
import { UserManager } from "./community-manager/user/UserManager";
import { GangManager } from "./community-manager/gang/GangManager";

export function RoleplayWidgets() {
    return (
        <>
            <GameControls />
            <WeaponEffects />
            <WebsocketDisconnect />
            <CorpManager />
            <GangManager />
            <UserManager />
        </>
    )
}