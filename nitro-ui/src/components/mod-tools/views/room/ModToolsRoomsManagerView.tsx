import { ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, CreateLinkEvent, RemoveLinkEventTracker } from '../../../../api';
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

export function ModToolsRoomsManagerView() {
    const [visible, setVisible] = useState(false);

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
            eventUrlPrefix: 'staff/rooms-manager'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

    if (!visible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="staff-corps" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 600, height: 400 }}>
            <NitroCardHeaderView headerText="Rooms Manager" onCloseClick={() => setVisible(false)} />
            <NitroCardContentView className="h-100">
                <div style={{ background: 'orange', padding: 4, display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', fontWeight: 800, fontSize: 24 }}>
                    this is a mock up
                </div>
                <input className="form-control form-control-sm" placeholder="Search rooms..." />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">
                                <Text variant="white">Room Name</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Owned By</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Tags</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Actions</Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Text variant="white">Town Square</Text>
                            </td>
                            <td>
                                <Text variant="white">HabRPG</Text>
                            </td>
                            <td>
                                <Text variant="white">taxi</Text>
                            </td>
                            <td>
                                <FaTrashAlt style={{ color: 'red', cursor: 'pointer', marginRight: 8 }} />
                                <FaPencilAlt style={{ color: 'blue', cursor: 'pointer' }} onClick={() => CreateLinkEvent('staff/rooms-manager/edit/1')} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="primary" onClick={() => CreateLinkEvent('navigator/create')}>
                        <FaPlusCircle style={{ marginRight: 4 }} />
                        Add Room
                    </Button>
                </div>
            </NitroCardContentView>
        </NitroCardView>
    );
}
