import { CrimeData, CrimeDataEvent, CrimeQueryListComposer, CrimeUpdateComposer, ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView } from '../../../../common';
import { useCallback, useEffect, useState } from 'react';
import { ChatWidgetOverlay } from '../../../chat-widget-overlay/ChatWidgetOverlay';
import { CrimeEditor } from './editors/CrimeEditor';
import { useMessageEvent } from '../../../../hooks';
import { allowedNodeEnvironmentFlags } from 'process';

export function ModToolsCrimesEditorView() {
    const [crimeID, setCrimeID] = useState<number>();
    const [crime, setCrime] = useState<CrimeData>();

    useEffect(() => {
        if (!crimeID) {
            return;
        }
        SendMessageComposer(new CrimeQueryListComposer());
    }, [crimeID]);

    useMessageEvent(CrimeDataEvent, (event: CrimeDataEvent) => {
        alert('hm')
        if (crime) {
            onToggle();
            return;
        }
        setCrime(event.getParser().crime);
    });

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 4) return;

                const crimeID = parts[3];

                if (!crimeID) {
                    return;
                }

                setCrimeID(Number(crimeID));
            },
            eventUrlPrefix: 'staff/crimes-manager/edit'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setCrimeID]);

    const onToggle = useCallback(() => {
        setCrime(undefined);
        setCrimeID(undefined);
    }, [setCrime, setCrimeID]);

    const onUpdateCrime = useCallback((crime: CrimeData) => {
        SendMessageComposer(new CrimeUpdateComposer(crimeID, crime.displayName, crime.description, crime.jailTime))
        onToggle();
    }, [crimeID, onToggle]);

    if (!crime) {
        return null;
    }

    return (
        <ChatWidgetOverlay visible>
            <NitroCardView uniqueKey="staff-crimes" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 600 }}>
                <NitroCardHeaderView headerText={`Editing Crime "${crime.displayName}"`} onCloseClick={onToggle} />
                <NitroCardContentView className="h-100">
                    <CrimeEditor defaultCrime={crime} onSave={onUpdateCrime} />
                </NitroCardContentView>
            </NitroCardView>
        </ChatWidgetOverlay>
    );
}
