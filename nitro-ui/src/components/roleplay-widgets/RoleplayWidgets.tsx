import { GameControls } from "./game-controls/GameControls";
import { WeaponEffects } from "./weapon-effects/WeaponEffects";
import { ReportBug } from "./report-bug/ReportBug";
import { WebsocketDisconnect } from "./websocket-disconnect/WebsocketDisconnect";
import { CorpList } from "./community-manager/corp-list/CorpList";
import { CorpProfile } from "./community-manager/corp-profile/CorpProfile";
import { UserList } from "./community-manager/user-list/UserList";
import { GangList } from "./community-manager/gang-list/GangList";
import { UserProfile } from "./community-manager/user-profile/UserProfile";
import { CorpProfileEdit } from "./community-manager/corp-profile-edit/CorpProfileEdit";
import { CorpProfileEditPosition } from "./community-manager/corp-profile-edit-position/CorpProfileEditPosition";
import { UserProfileEditor } from "./community-manager/user-profile-editor/UserProfileEditor";
import { CorpProfileCreate } from "./community-manager/corp-profile-create/CorpProfileCreate";
import { CorpProfileCreatePosition } from "./community-manager/corp-profile-create-position/CorpProfileCreatePosition";

export function RoleplayWidgets() {
    return (
        <>
            <GameControls />
            <WeaponEffects />
            <ReportBug />
            <WebsocketDisconnect />
            <CorpList />
            <CorpProfile />
            <CorpProfileCreate />
            <CorpProfileEdit />
            <CorpProfileCreatePosition />
            <CorpProfileEditPosition />
            <UserList />
            <UserProfile />
            <UserProfileEditor />
            <GangList />
        </>
    )
}