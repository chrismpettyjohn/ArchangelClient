import { ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker } from '../../../../api';
import { DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export function ModToolsBugReportsView() {
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
            eventUrlPrefix: 'staff/bug-reports'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

    if (!visible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="staff-bug-reports" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 600, height: 400 }}>
            <NitroCardHeaderView headerText="Bug Reports" onCloseClick={() => setVisible(false)} />
            <NitroCardContentView className="h-100">
                <input className="form-control form-control-sm" placeholder="Search beta codes..." />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">
                                <Text variant="white">Bug Report</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Status</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Created At</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Reported By</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Actions</Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Text variant="white">typing doesn't work on chat bar</Text>
                            </td>
                            <td>
                                <span style={{ color: 'yellow' }}>In Progress</span>
                            </td>
                            <td>
                                <Text variant="white">11-01-2024</Text>
                            </td>
                            <td>
                                <Text variant="white">LeChris</Text>
                            </td>
                            <td>
                                <FaCheckCircle style={{ color: 'green', cursor: 'pointer' }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </NitroCardContentView>
        </NitroCardView>
    );
}
