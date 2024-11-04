import { ILinkEventTracker, CrimeQueryListComposer, CrimeData, CrimeListEvent, CrimeDeleteComposer } from '@nitro-rp/renderer';
import { AddEventLinkTracker, CreateLinkEvent, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { useMessageEvent } from '../../../../hooks';

export function ModToolsCrimesManagerView() {
    const [visible, setVisible] = useState(false);
    const [crimes, setCrimes] = useState<CrimeData[]>([]);

    useEffect(() => {
        if (!visible) {
            return;
        }
        SendMessageComposer(new CrimeQueryListComposer())
    }, [visible]);

    useMessageEvent(CrimeListEvent, (event: CrimeListEvent) => {
        setCrimes(event.getParser().crimes);
    })

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
            eventUrlPrefix: 'staff/crimes-manager'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

    if (!visible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="staff-crimes" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 400 }}>
            <NitroCardHeaderView headerText="Crimes Manager" onCloseClick={() => setVisible(false)} />
            <NitroCardContentView className="h-100">
                <input className="form-control form-control-sm" placeholder="Search crimes..." />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">
                                <Text variant="white">Display Name</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Damage</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Actions</Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            crimes.map(_ => (
                                <tr key={`crime_${_.displayName}`}>
                                    <td>
                                        <Text variant="white">{_.displayName}</Text>
                                    </td>
                                    <td>
                                        <Text variant="white">{_.description}</Text>
                                    </td>
                                    <td>
                                        <Text variant="white">{Math.round(_.jailTime / 60)} minutes</Text>
                                    </td>
                                    <td>
                                        <FaTrashAlt style={{ color: 'red', cursor: 'pointer', marginRight: 8 }} onClick={() => SendMessageComposer(new CrimeDeleteComposer(_.id))} />
                                        <FaPencilAlt style={{ color: 'blue', cursor: 'pointer' }} onClick={() => CreateLinkEvent(`staff/crimes-manager/edit/${_.id}`)} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="primary" onClick={() => CreateLinkEvent('staff/crimes-manager/create')}>
                        <FaPlusCircle style={{ marginRight: 4 }} />
                        Add Crime
                    </Button>
                </div>
            </NitroCardContentView>
        </NitroCardView>
    );
}
