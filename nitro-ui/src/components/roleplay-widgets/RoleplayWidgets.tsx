import { GameControls } from "./game-controls/GameControls";
import { WeaponEffects } from "./weapon-effects/WeaponEffects";
import { ReportBug } from "./report-bug/ReportBug";
import { WebsocketDisconnect } from "./websocket-disconnect/WebsocketDisconnect";
import { CorpList } from "./community-manager/corp-list/CorpList";
import { CorpProfile } from "./community-manager/corp-profile/CorpProfile";
import { UserList } from "./community-manager/user-list/UserList";
import { GangList } from "./community-manager/gang-list/GangList";
import { UserProfile } from "./community-manager/users-profile/UsersProfile";
import { UserProfileEditor } from "./community-manager/users-profile-editor/UsersProfileEditor";
import { CorpProfileEdit } from "./community-manager/corp-profile-edit/CorpProfileEdit";

export function RoleplayWidgets() {
    return (
        <>
            <GameControls />
            <WeaponEffects />
            <ReportBug />
            <WebsocketDisconnect />
            <CorpList />
            <CorpProfile />
            <CorpProfileEdit />
            <UserList />
            <UserProfile />
            <UserProfileEditor />
            <GangList />
        </>
    )
}