import { CreateLinkEvent } from "../../../../../api";

export function UserLeaderboard() {
    return (
        <>
            <ul>
                <li onClick={() => CreateLinkEvent('users/1')}>User 1</li>
                <li onClick={() => CreateLinkEvent('users/1')}>User 2</li>
                <li onClick={() => CreateLinkEvent('users/1')}>User 3</li>
            </ul>
        </>
    )
}