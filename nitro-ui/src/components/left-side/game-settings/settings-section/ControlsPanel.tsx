import React from "react";
import { FaCaretSquareDown, FaCaretSquareLeft, FaCaretSquareRight, FaCaretSquareUp, FaComment, FaCrosshairs, FaFistRaised, FaSync, FaSyncAlt } from "react-icons/fa";
import { Text } from "../../../../common";

export function ControlsPanel() {
    return (
        <>
            <Text bold fontSize={4} variant="white">General</Text>
            <div>
                <FaComment style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">tab = Toggle chat mode</Text>
            </div>
            <br />
            <Text bold fontSize={4} variant="white">Movement</Text>
            <div>
                <FaCaretSquareUp style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">w = Move Up</Text>
            </div>
            <div>
                <FaCaretSquareLeft style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">a = Move Left</Text>
            </div>
            <div>
                <FaCaretSquareRight style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">d = Move Right</Text>
            </div>
            <div>
                <FaCaretSquareDown style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">s = Move Down</Text>
            </div>
            <br />
            <Text bold fontSize={4} variant="white">Combat</Text>
            <div>
                <FaFistRaised style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">i = Toggle combat mode</Text>
            </div>
            <div>
                <FaSyncAlt style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">r = Reload</Text>
            </div>
            <div>
                <FaCrosshairs style={{ marginRight: 8 }} />
                <Text fontSize={4} variant="white">left click = Attack</Text>
                <Text fontSize={5} style={{ marginLeft: 20 }}>*must be in combat mode</Text>
            </div >
        </>
    );
}
