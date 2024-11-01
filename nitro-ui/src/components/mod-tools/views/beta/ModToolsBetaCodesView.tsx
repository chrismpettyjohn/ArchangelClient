import { useEffect, useState } from 'react';
import { DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { ILinkEventTracker } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker } from '../../../../api';

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
        <NitroCardView uniqueKey="staff-beta-codes" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" >
            <NitroCardHeaderView headerText="Beta Codes" onCloseClick={() => alert('will close')} />
            <NitroCardContentView className="text-black h-100">
                <Text fontSize={4} variant="white">hello world</Text>
            </NitroCardContentView>
        </NitroCardView>
    );
}
