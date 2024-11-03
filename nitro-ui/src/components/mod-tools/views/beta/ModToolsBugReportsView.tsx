import { BugReportListEvent, BugReportListRow, BugReportQueryListComposer, ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useMessageEvent } from '../../../../hooks';

export function ModToolsBugReportsView() {
    const [visible, setVisible] = useState(false);
    const [bugReports, setBugReports] = useState<BugReportListRow[]>([]);

    useEffect(() => {
        if (!visible) {
            return;
        }
        SendMessageComposer(new BugReportQueryListComposer())
    }, [visible]);

    useMessageEvent(BugReportListEvent, (event: BugReportListEvent) => {
        setBugReports(event.getParser().bugReports);
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
            eventUrlPrefix: 'staff/beta-codes'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

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
                        {
                            bugReports.map(_ => (
                                <tr key={`bug_report_${_.id}`}>
                                    <td>
                                        <Text variant="white">{_.displayName}</Text>
                                    </td>
                                    <td>
                                        <span style={{ color: 'yellow' }}>In Progress</span>
                                    </td>
                                    <td>
                                        <Text variant="white">{new Date(_.createdAt).toLocaleDateString()}</Text>
                                    </td>
                                    <td>
                                        <Text variant="white">{_.createdByUsername}</Text>
                                    </td>
                                    <td>
                                        <FaCheckCircle style={{ color: 'green', cursor: 'pointer' }} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    bugReports.length === 0 && <Text style={{ marginTop: -20 }} variant="white">There are no bug reports.</Text>
                }
            </NitroCardContentView>
        </NitroCardView>
    );
}
