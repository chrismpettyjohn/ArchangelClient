import { ILinkEventTracker, EmuSettings } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { useMessageEvent } from '../../../../hooks';
import { EmuSettingsDeleteComposer, EmuSettingsQueryListComposer, EmuSettingsQueryListEvent, EmuSettingsUpdateComposer } from '@nitro-rp/renderer/src';
import { ChatWidgetOverlay } from '../../../chat-widget-overlay/ChatWidgetOverlay';

export function ModTooolsEmuSettingsView() {
    const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [config, setConfig] = useState<EmuSettings[]>([]);
    const filteredConfig = useMemo(() => config.filter(() => true), [config, query]);

    const onSetValue = useCallback((key: string, value: string) => {
        console.log({ key, value })
        SendMessageComposer(new EmuSettingsUpdateComposer(key, value));
    }, []);

    const onDeleteKey = useCallback((key: string) => {
        SendMessageComposer(new EmuSettingsDeleteComposer(key));
    }, []);

    useEffect(() => {
        if (!visible) {
            return;
        }
        SendMessageComposer(new EmuSettingsQueryListComposer())
    }, [visible]);

    useMessageEvent(EmuSettingsQueryListEvent, (event: EmuSettingsQueryListEvent) => {
        setConfig(event.getParser().settings);
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
            eventUrlPrefix: 'staff/emu-settings'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

    if (!visible) {
        return null;
    }

    return (
        <ChatWidgetOverlay visible={visible}>
            <NitroCardView uniqueKey="staff-emu-settings" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 600, height: 500 }}>
                <NitroCardHeaderView headerText="EMU Settings" onCloseClick={() => setVisible(false)} />
                <NitroCardContentView className="h-100">
                    <input className="form-control form-control-sm" placeholder="Search keys..." />
                    <table className="table table-striped table-bordered" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: 200 }}>
                                    <Text variant="white">Key</Text>
                                </th>
                                <th scope="col" style={{ width: 200 }}>
                                    <Text variant="white">Value</Text>
                                </th>
                                <th scope="col" style={{ width: 50 }}>
                                    <Text variant="white">Actions</Text>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredConfig.map((item) => (
                                <tr key={`config_${item.key}`}>
                                    <td>
                                        <Text bold fontSize={5} variant="white">{item.key}</Text>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            defaultValue={item.value}
                                            onBlur={(e) => onSetValue(item.key, e.target.value ?? '')}
                                            style={{ width: '100%' }}
                                        />
                                    </td>
                                    <td>
                                        <FaTrashAlt
                                            style={{ color: 'red', cursor: 'pointer', marginRight: 8 }}
                                            onClick={() => onDeleteKey(item.key)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="primary">
                            <FaPlusCircle style={{ marginRight: 4 }} />
                            Add Config
                        </Button>
                    </div>
                </NitroCardContentView>
            </NitroCardView>
        </ChatWidgetOverlay>
    );
}
