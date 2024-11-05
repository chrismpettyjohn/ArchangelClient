import { FaCamera, FaCog, FaCogs, FaMicrophone, FaShieldAlt, FaTaxi } from "react-icons/fa";
import { CreateLinkEvent, GetSessionDataManager } from "../../../api";
import { useState } from "react";
import { useRoomSessionManagerEvent } from "../../../hooks";
import { RoomSessionEvent } from "@nitro-rp/renderer";

export function GameTools() {
    // Race condition on session manager requires active room state
    const [activeRoom, setActiveRoom] = useState(false);

    useRoomSessionManagerEvent<RoomSessionEvent>([
        RoomSessionEvent.CREATED,
        RoomSessionEvent.ENDED
    ], event => {
        switch (event.type) {
            case RoomSessionEvent.CREATED:
                setActiveRoom(true);
                return;
            case RoomSessionEvent.ENDED:
                setActiveRoom(false);
                return;
        }
    });

    if (!activeRoom) {
        return null;
    }

    return (

        <div style={{ position: 'relative' }}>
            <div className="quick-menu">
                <div className="menu-button glass-panel " onClick={() => CreateLinkEvent('navigator/toggle')} >
                    <FaTaxi size={20} />
                </div>
                <div className="menu-button glass-panel " onClick={() => CreateLinkEvent('camera/toggle')} >
                    <FaCamera size={20} />
                </div>
                <div className="menu-button glass-panel " onClick={() => CreateLinkEvent('game-settings/toggle')} >
                    <FaCog size={20} />
                </div>
                {
                    GetSessionDataManager().isModerator && (
                        <>
                            <div className="menu-button glass-panel" onClick={() => CreateLinkEvent('mod-tools/toggle')} >
                                <FaShieldAlt size={20} style={{ color: 'red' }} />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}