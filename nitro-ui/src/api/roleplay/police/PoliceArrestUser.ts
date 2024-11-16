import { PoliceArrestComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../..';

export function PoliceArrestUser(userID: number): void {
    SendMessageComposer(new PoliceArrestComposer(userID));
}
