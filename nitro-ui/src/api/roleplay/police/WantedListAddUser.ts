import { WantedListAddUserComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function WantedListAddUser(username: string, crimeID: number): void {
    SendMessageComposer(new WantedListAddUserComposer(username, crimeID));
}
