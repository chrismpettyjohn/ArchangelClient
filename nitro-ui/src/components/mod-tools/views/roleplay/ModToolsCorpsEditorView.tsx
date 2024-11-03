import { ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker } from '../../../../api';
import { Button, DraggableWindowPosition, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { ChatWidgetOverlay } from '../../../chat-widget-overlay/ChatWidgetOverlay';

export function ModToolsCorpsEditorView() {
    const [corpID, setCorpID] = useState<number>();

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 4) return;

                const corpID = parts[3];

                if (!corpID) {
                    return;
                }

                setCorpID(Number(corpID));
            },
            eventUrlPrefix: 'staff/corps-manager/edit'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setCorpID]);

    if (!corpID) {
        return null;
    }

    return (
        <ChatWidgetOverlay visible>
            <NitroCardView uniqueKey="staff-corps" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 600 }}>
                <NitroCardHeaderView headerText="Corps Manager" onCloseClick={() => setCorpID(undefined)} />
                <NitroCardContentView className="h-100">
                    <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
                        <div>
                            <Text bold fontSize={5} variant="white">Identifier</Text>
                            <input className="form-control form-control-sm" placeholder="hk-mp5" type="text" />
                        </div>
                        <div>
                            <Text bold fontSize={5} variant="white">Display Name</Text>
                            <input className="form-control form-control-sm" placeholder="HK MP5" type="text" />
                        </div>
                        <div>
                            <Text bold fontSize={5} variant="white">Special Abilities</Text>
                            <input className="form-control form-control-sm" placeholder="5" type="number" />
                        </div>
                        <Grid columnCount={2}>
                            <div>
                                <Text bold fontSize={5} variant="white">Type</Text>
                                <input className="form-control form-control-sm" placeholder="5" type="number" />
                            </div>
                            <div>
                                <Text bold fontSize={5} variant="white">Weight</Text>
                                <input className="form-control form-control-sm" placeholder="3" type="number" />
                            </div>
                            <div>
                                <Text bold fontSize={5} variant="white">Ammo Capacity</Text>
                                <input className="form-control form-control-sm" placeholder="30" type="number" />
                            </div>
                            <div>
                                <Text bold fontSize={5} variant="white">Min. Damage</Text>
                                <input className="form-control form-control-sm" placeholder="7" type="number" />
                            </div>
                            <div>
                                <Text bold fontSize={5} variant="white">Max. Damage</Text>
                                <input className="form-control form-control-sm" placeholder="15" type="number" />
                            </div>
                            <div>
                                <Text bold fontSize={5} variant="white">Range</Text>
                                <input className="form-control form-control-sm" placeholder="8" type="number" />
                            </div>
                            <div>
                                <Text bold fontSize={5} variant="white">Cooldown</Text>
                                <input className="form-control form-control-sm" placeholder="5" type="number" />
                            </div>
                            <div>
                                <Text bold fontSize={5} variant="white">Reload Time</Text>
                                <input className="form-control form-control-sm" placeholder="5" type="number" />
                            </div>
                        </Grid>
                        <hr />
                        <div>
                            <Text bold fontSize={5} variant="white">Equip Effect</Text>
                            <input className="form-control form-control-sm" placeholder="5" type="number" />
                        </div>
                        <div>
                            <Text bold fontSize={5} variant="white">Equip Message</Text>
                            <input className="form-control form-control-sm" placeholder="5" type="number" />
                        </div>
                        <div>
                            <Text bold fontSize={5} variant="white">Reload Message</Text>
                            <input className="form-control form-control-sm" placeholder="5" type="number" />
                        </div>
                        <div>
                            <Text bold fontSize={5} variant="white">Holster Message</Text>
                            <input className="form-control form-control-sm" placeholder="5" type="number" />
                        </div>
                    </form>

                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="primary">
                            <FaPencilAlt style={{ marginRight: 4 }} />
                            Save
                        </Button>
                    </div>
                </NitroCardContentView>
            </NitroCardView>
        </ChatWidgetOverlay >
    );
}
