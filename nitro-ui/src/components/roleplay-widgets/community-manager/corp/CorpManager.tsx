import { CorpList } from "./corp-list/CorpList";
import { CorpProfileCreatePosition } from "./corp-profile-create-position/CorpProfileCreatePosition";
import { CorpProfileCreate } from "./corp-profile-create/CorpProfileCreate";
import { CorpProfileEditPosition } from "./corp-profile-edit-position/CorpProfileEditPosition";
import { CorpProfileEdit } from "./corp-profile-edit/CorpProfileEdit";
import { CorpProfile } from "./corp-profile/CorpProfile";

export function CorpManager() {
    return (
        <>
            <CorpList />
            <CorpProfile />
            <CorpProfileCreate />
            <CorpProfileCreatePosition />
            <CorpProfileEdit />
            <CorpProfileEditPosition />
        </>
    )
}