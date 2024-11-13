import { GangQueryOneComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function GangQueryOne(gangID: number): void {
    SendMessageComposer(new GangQueryOneComposer(gangID));
}
