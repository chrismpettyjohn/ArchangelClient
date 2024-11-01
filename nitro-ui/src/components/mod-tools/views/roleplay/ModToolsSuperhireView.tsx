import { ILinkEventTracker, RoomUsersListRow } from '@nitro-rp/renderer';
import { useEffect, useState } from 'react';
import { Column, DraggableWindowPosition, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { UserSelect } from '../../../roleplay/UserSelect';
import { CorpPositionSelect } from '../../../roleplay/CorpPositionSelect';
import { Button } from 'react-bootstrap';
import { CorpSelect } from '../../../roleplay/CorpSelect';
import { CorpSuperHire } from '../../../../api/roleplay/corp/CorpSuperhire';
import { AddEventLinkTracker, RemoveLinkEventTracker } from '../../../../api';



export function ModToolsSuperhireView() {
    const [visible, setVisible] = useState(false);
    const [corpID, setCorpID] = useState<number>();
    const [user, setUser] = useState<RoomUsersListRow>();
    const [corpPositionID, setCorpPositionID] = useState<number>();

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 3) return;

                switch (parts[2]) {
                    case 'toggle':
                        setVisible(prevValue => !prevValue);
                        return;
                }
            },
            eventUrlPrefix: 'staff/superhire'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

    if (!visible) {
        return null;
    }


    const disabled = false;

    function onChangeUser(user: RoomUsersListRow) {
        setUser(user)
    }

    function onHireUser() {
        if (!user?.username || !corpID || !corpPositionID) {
            return;
        }
        CorpSuperHire(user.username, corpID, corpPositionID);
        setVisible(false);
    }

    return (
        <NitroCardView className="nitro-mod-tools-superhire" theme="primary-slim" windowPosition={DraggableWindowPosition.TOP_LEFT}>
            <NitroCardHeaderView headerText="Superhire" onCloseClick={() => setVisible(false)} />
            <NitroCardContentView className="text-black h-100">
                <Grid fullHeight={false} fullWidth style={{ padding: 2, minWidth: 250 }}>
                    <Column size={12}>
                        <Text className="col-2" variant="white" fontSize={6}>Username</Text>
                        <UserSelect userID={user?.id} onChange={onChangeUser} />
                        <Text className="col-2" variant="white" fontSize={6}>Corporation</Text>
                        <CorpSelect corpID={corpID} onChange={corp => setCorpID(corp.id)} />
                        <Text className="col-2" variant="white" fontSize={6}>Position</Text>
                        <CorpPositionSelect corpID={corpID} corpPositionID={corpPositionID} onChange={pos => setCorpPositionID(pos.id)} />
                        <Button disabled={disabled} size="sm" type="button" variant="success" onClick={onHireUser}>
                            Hire
                        </Button>
                    </Column>
                </Grid>
            </NitroCardContentView>
        </NitroCardView>
    );
}
