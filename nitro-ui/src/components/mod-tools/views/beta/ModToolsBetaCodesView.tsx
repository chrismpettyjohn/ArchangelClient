import { useEffect, useState } from 'react';
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker } from '../../../../api';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

export function ModToolsBetaCodesView() {
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
            eventUrlPrefix: 'staff/beta-codes'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

    if (!visible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="staff-beta-codes" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 400 }}>
            <NitroCardHeaderView headerText="Beta Codes" onCloseClick={() => alert('will close')} />
            <NitroCardContentView className="h-100">
                <input className="form-control form-control-sm" placeholder="Search beta codes..." />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">
                                <Text variant="white">Beta Code</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Claimed On</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Claimed By User</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Actions</Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Text variant="white">DADDY-LONG-LEGS</Text>
                            </td>
                            <td>
                                <Text variant="white">11-01-2024</Text>
                            </td>
                            <td>
                                <Text variant="white">LeChris</Text>
                            </td>
                            <td>
                                <FaTrashAlt style={{ color: 'red', cursor: 'pointer' }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="primary">
                        <FaPlusCircle style={{ marginRight: 4 }} />
                        Generate Code
                    </Button>
                </div>
            </NitroCardContentView>
        </NitroCardView>
    );
}
