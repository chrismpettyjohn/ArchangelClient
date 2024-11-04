import { useEffect, useState } from 'react';
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { BetaCodeDeleteComposer, BetaCodeGenerateComposer, BetaCodeListEvent, BetaCodeListRow, BetaCodeQueryListComposer, ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { useMessageEvent } from '../../../../hooks';

export function ModToolsBetaCodesView() {
    const [visible, setVisible] = useState(false);
    const [betaCodes, setBetaCodes] = useState<BetaCodeListRow[]>([]);

    useEffect(() => {
        if (!visible) return;
        SendMessageComposer(new BetaCodeQueryListComposer())
    }, [visible]);

    useMessageEvent(BetaCodeListEvent, (event: BetaCodeListEvent) => {
        setBetaCodes(event.getParser().betaCodes);
    });

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

    const copyToClipboard = (code) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).catch(() => fallbackCopyToClipboard(code));
        } else {
            fallbackCopyToClipboard(code);
        }
    }

    const fallbackCopyToClipboard = (code) => {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed'; // Prevents scrolling to bottom of page
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Copying text command was unsuccessful', err);
        }
        document.body.removeChild(textArea);
    };


    if (!visible) return null;

    return (
        <NitroCardView uniqueKey="staff-beta-codes" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 400 }}>
            <NitroCardHeaderView headerText="Beta Codes" onCloseClick={() => setVisible(false)} />
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
                                <Text variant="white">Claimed By</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Actions</Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            betaCodes.map(_ => (
                                <tr key={`beta_code_${_.id}`}>
                                    <td onClick={() => copyToClipboard(_.code)} style={{ cursor: 'pointer' }}>
                                        <Text variant="white" title="Click to copy">{_.code}</Text>
                                    </td>
                                    <td>
                                        <Text variant="white">{_.createdAt ? new Date(_.createdAt).toLocaleDateString() : '-'}</Text>
                                    </td>
                                    <td>
                                        <Text variant="white">{_.claimedByUsername ? _.claimedByUsername : '-'}</Text>
                                    </td>
                                    <td>
                                        <FaTrashAlt style={{ color: 'red', cursor: 'pointer' }} onClick={() => SendMessageComposer(new BetaCodeDeleteComposer(_.id))} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    betaCodes.length === 0 && <Text style={{ marginTop: -20 }} variant="white">There are no beta codes.</Text>
                }
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="primary" onClick={() => SendMessageComposer(new BetaCodeGenerateComposer())}>
                        <FaPlusCircle style={{ marginRight: 4 }} />
                        Generate Code
                    </Button>
                </div>
            </NitroCardContentView>
        </NitroCardView>
    );
}
