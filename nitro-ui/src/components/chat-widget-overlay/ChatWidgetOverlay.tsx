import { ReactNode, useEffect } from "react";
import { FocusMode, useSharedUI } from "../../context/shared-ui";

interface ChatWidgetOverlayProps {
    children: ReactNode;
    visible: boolean;
}

export function ChatWidgetOverlay({ children, visible }: ChatWidgetOverlayProps) {
    const { setFocus } = useSharedUI();

    useEffect(() => {
        if (!visible) {
            return;
        }
        setFocus(FocusMode.Modal);
        return (() => {
            setFocus(FocusMode.Controls);
        })
    }, [visible, setFocus]);

    return (
        <>
            {children}
        </>
    )
}