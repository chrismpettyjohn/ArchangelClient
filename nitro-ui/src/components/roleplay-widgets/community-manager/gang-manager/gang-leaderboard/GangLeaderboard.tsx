import { CreateLinkEvent } from "../../../../../api";

export function GangLeaderboard() {
    return (
        <>
            <ul>
                <li onClick={() => CreateLinkEvent('gangs/1')}>Gang 1</li>
                <li onClick={() => CreateLinkEvent('gangs/1')}>Gang 2</li>
                <li onClick={() => CreateLinkEvent('gangs/1')}>Gang 3</li>
            </ul>
        </>
    )
}