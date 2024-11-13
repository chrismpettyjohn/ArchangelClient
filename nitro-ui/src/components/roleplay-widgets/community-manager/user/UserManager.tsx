import { UserList } from "./user-list/UserList";
import { UserProfileEditor } from "./user-profile-editor/UserProfileEditor";
import { UserProfile } from "./user-profile/UserProfile";

export function UserManager() {
    return (
        <>
            <UserList />
            <UserProfile />
            <UserProfileEditor />
        </>
    )
}