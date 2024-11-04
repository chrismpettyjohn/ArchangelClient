import { CrimeCreateComposer, CrimeData, CrimeDataEvent, ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, CreateLinkEvent, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { DraggableWindowPosition, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../../../common';
import { useCallback, useEffect, useState } from 'react';
import { ChatWidgetOverlay } from '../../../chat-widget-overlay/ChatWidgetOverlay';
import { _setVisible } from 'ag-grid-community';
import { CrimeEditor } from './editors/CrimeEditor';
import { useMessageEvent } from '../../../../hooks';

export function ModToolsCrimesCreatorView() {
    const [visible, setVisible] = useState(false);

    useMessageEvent(CrimeDataEvent, (event: CrimeDataEvent) => {
        CreateLinkEvent(`staff/crimes-manager/edit/${event.getParser().crime.id}`)
        setVisible(false)
    })

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 3) return;

                switch (parts[2]) {
                    case 'create':
                        setVisible(true);
                        return;
                }
            },
            eventUrlPrefix: 'staff/crimes-manager'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

    const onCreateCrime = useCallback((crime: CrimeData) => {
        SendMessageComposer(new CrimeCreateComposer(crime.displayName, crime.description, crime.jailTime))
    }, [setVisible]);

    if (!visible) {
        return null;
    }

    return (
        <ChatWidgetOverlay visible>
            <NitroCardView uniqueKey="staff-crimes-creator" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 600 }}>
                <NitroCardHeaderView headerText="Add New Crime" onCloseClick={() => setVisible(false)} />
                <NitroCardContentView className="h-100">
                    <CrimeEditor onSave={onCreateCrime} />
                </NitroCardContentView>
            </NitroCardView>
        </ChatWidgetOverlay>
    );
}
