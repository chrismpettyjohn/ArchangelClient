import { FaBug } from "react-icons/fa";
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { ChangeEvent, SyntheticEvent, useCallback, useMemo, useState } from "react";
import { NotificationBubbleType, SendMessageComposer } from "../../../api";
import { BugReportCreateComposer, BugReportDataEvent } from "@nitro-rp/renderer";
import { useMessageEvent, useNotification } from "../../../hooks";
import { ChatWidgetOverlay } from "../../chat-widget-overlay/ChatWidgetOverlay";

export function ReportBug() {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const { showSingleBubble } = useNotification();
    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');

    const isDisabled = useMemo(() => !displayName || !description || !!loading, [displayName, description, loading]);

    useMessageEvent(BugReportDataEvent, () => {
        setVisible(false);
        setLoading(false);
        showSingleBubble('Your bug report has been sent to the staff team', NotificationBubbleType.INFO);
    });

    const onChangeDisplayName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setDisplayName(event.target.value);
    }, [setDisplayName]);

    const onChangeDescription = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }, [setDescription]);

    const onToggleVisibility = useCallback(() => {
        setVisible(_ => !_);
    }, [setVisible]);

    const onReportBug = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (!isDisabled) {
            return;
        }
        SendMessageComposer(new BugReportCreateComposer(displayName, description))
        setLoading(true);
    }, [isDisabled, displayName, description]);

    return (
        <ChatWidgetOverlay visible={visible}>
            <div style={{ position: 'absolute', bottom: 40, left: 180 }}>
                <Button variant="danger" onClick={onToggleVisibility}>
                    <FaBug style={{ marginRight: 8 }} />
                    Report Bug
                </Button>
                {
                    visible && (
                        <NitroCardView uniqueKey="report-bug" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 400 }}>
                            <NitroCardHeaderView headerText="Report Bug" onCloseClick={() => setVisible(false)} />
                            <NitroCardContentView className="h-100">
                                <form className="h-100" onSubmit={onReportBug}>
                                    <div>
                                        <Text bold fontSize={4} variant="white">Summarize the issue</Text>
                                        <input className="form-control form-control-sm" type="text" value={displayName} onChange={onChangeDisplayName} />
                                    </div>
                                    <br />
                                    <div>
                                        <Text bold fontSize={4} variant="white">Describe the bug</Text>
                                        <textarea className="form-control form-control-sm" value={description} onChange={onChangeDescription} rows={10} />
                                    </div>
                                    <br />
                                    <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', marginTop: 'auto' }}>
                                        <Button disabled={isDisabled} variant="success" onClick={onReportBug}>
                                            Report bug
                                        </Button>
                                    </div>
                                </form>
                            </NitroCardContentView>
                        </NitroCardView>
                    )
                }
            </div >
        </ChatWidgetOverlay>
    )
}