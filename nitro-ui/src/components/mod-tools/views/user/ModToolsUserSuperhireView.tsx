import { ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker } from '../../../../api';
import { Button, Column, DraggableWindowPosition, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRoleplayStats } from '../../../../hooks/roleplay/use-rp-stats';
import { CorpSelect } from '../../../roleplay/CorpSelect';
import { CorpPositionSelect } from '../../../roleplay/CorpPositionSelect';
import { CorpSuperHire } from '../../../../api/roleplay/corp/CorpSuperhire';

export function ModToolsUserSuperhireView() {
    const [corpID, setCorpID] = useState<number>();
    const [userID, setUserID] = useState<number>();
    const rpStats = useRoleplayStats(userID);
    const [corpPositionID, setCorpPositionID] = useState<number>();

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 3) return;

                setUserID(Number(parts[2]));
            },
            eventUrlPrefix: 'staff/superhire'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setUserID]);

    const disabled = useMemo(() => !corpID || !corpPositionID || !rpStats.userID, [corpID, corpPositionID, rpStats.userID]);

    const onSuperhire = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (disabled) {
            return;
        }
        CorpSuperHire(rpStats.username, corpID, corpPositionID);
    }, [disabled]);

    if (!userID || !rpStats.userID) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="staff-superhire" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 400 }}>
            <NitroCardHeaderView headerText={`${rpStats.username}'s Job`} onCloseClick={() => setUserID(undefined)} />
            <NitroCardContentView className="h-100">
                <Grid fullHeight={false} fullWidth style={{ padding: 2, minWidth: 250 }}>
                    <Column size={12}>
                        <Text className="col-2" variant="white" fontSize={6}>Corp</Text>
                        <CorpSelect corpID={corpID} onChange={corp => setCorpID(corp.id)} />
                        <Text className="col-2" variant="white" fontSize={6}>Role</Text>
                        <CorpPositionSelect corpID={corpID} corpPositionID={corpPositionID} onChange={pos => setCorpPositionID(pos.id)} />
                        <Button disabled={disabled} size="sm" variant="success" onClick={onSuperhire}>
                            Superhire
                        </Button>
                    </Column>
                </Grid>
            </NitroCardContentView>
        </NitroCardView>
    );
}
