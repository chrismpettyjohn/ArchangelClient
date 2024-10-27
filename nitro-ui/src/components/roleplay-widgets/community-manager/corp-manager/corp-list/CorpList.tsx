import { CreateLinkEvent } from "../../../../../api";

export function CorpList() {
    return (
        <>
            <ul>
                <li onClick={() => CreateLinkEvent('corps/1')}>Corp 1</li>
                <li onClick={() => CreateLinkEvent('corps/1')}>Corp 2</li>
                <li onClick={() => CreateLinkEvent('corps/1')}>Corp 3</li>
            </ul>
        </>
    )
}