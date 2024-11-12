import { CorpPositionInfoQueryComposer } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../';

export function CorpPositionInfoQuery(corpPositionID: number): void {
    SendMessageComposer(new CorpPositionInfoQueryComposer(corpPositionID));
}
