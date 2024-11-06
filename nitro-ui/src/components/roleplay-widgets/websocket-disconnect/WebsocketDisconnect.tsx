import { useState } from "react"
import { useMainEvent } from "../../../hooks";
import { NitroCommunicationDemoEvent } from "@nitro-rp/renderer";
import { rpMessageOverlay } from "../roleplay-effects/RoleplayEffects";

export function WebsocketDisconnect() {
    const [disconnected, setDisconnected] = useState(false);

    useMainEvent(NitroCommunicationDemoEvent.CONNECTION_CLOSED, () => setDisconnected(true));

    if (!disconnected) {
        return;
    }

    return (
        <div style={rpMessageOverlay.overlay}>
            <div style={rpMessageOverlay.messageBox}>
                <div style={rpMessageOverlay.message}>
                    DISCONNECTED
                </div>
            </div>
        </div>
    )
}