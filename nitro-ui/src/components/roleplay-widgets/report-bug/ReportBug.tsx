import { FaBug } from "react-icons/fa";
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { SendMessageComposer } from "../../../api";
import { BugReportCreateComposer } from "@nitro-rp/renderer";
import { FocusMode, useSharedUI } from "../../../context/shared-ui";

export function ReportBug() {
    const { setFocus } = useSharedUI();
    const [visible, setVisible] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');

    const isDisabled = useMemo(() => !displayName && !description, [displayName, description]);

    useEffect(() => {
        setFocus(FocusMode.Modal);
        return (() => {
            setFocus(FocusMode.Controls);
        })
    }, []);

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
    }, [isDisabled, displayName, description]);

    return (
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
                                    <Button disabled={isDisabled} variant="success">
                                        Report bug
                                    </Button>
                                </div>
                            </form>
                        </NitroCardContentView>
                    </NitroCardView>
                )
            }
        </div >
    )
}