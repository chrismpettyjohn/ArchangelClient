import { GangList } from "./gang-list/GangList";
import { GangProfileCreatePosition } from "./gang-profile-create-position/GangProfileCreatePosition";
import { GangProfileCreate } from "./gang-profile-create/GangProfileCreate";
import { GangProfileEditPosition } from "./gang-profile-edit-position/GangProfileEditPosition";
import { GangProfileEdit } from "./gang-profile-edit/GangProfileEdit";
import { GangProfile } from "./gang-profile/GangProfile";

export function GangManager() {
    return (
        <>
            <GangList />
            <GangProfile />
            <GangProfileCreate />
            <GangProfileCreatePosition />
            <GangProfileEdit />
            <GangProfileEditPosition />
        </>
    )
}