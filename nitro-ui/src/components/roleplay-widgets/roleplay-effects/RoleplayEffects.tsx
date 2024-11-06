import { UserArrestedEvent, UserDiedEvent } from "@nitro-rp/renderer";
import { useMessageEvent, useSessionInfo } from "../../../hooks";
import { useState } from "react";
import { PlaySound, SoundNames } from "../../../api";

export const rpMessageOverlay = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    messageBox: {
        backgroundColor: '#313131',
        padding: '1rem 2rem',
        borderRadius: '0.5rem',
        width: '100%',
    },
    message: {
        fontSize: '5rem', // Adjust as needed
        color: 'rgb(0, 128, 255)', // Blue text
        fontFamily: '"Pricedown", sans-serif', // Use the imported font
        textAlign: 'center',
    },
};

export function RoleplayEffects() {
    const { userInfo } = useSessionInfo();
    const [died, setDied] = useState(false);
    const [arrested, setArrested] = useState(false);

    useMessageEvent<UserDiedEvent>(UserDiedEvent, event => {
        const parser = event.getParser();
        if (parser.userId !== userInfo?.userId) {
            return;
        }
        PlaySound(SoundNames.WASTED)
        setDied(true);
        setTimeout(() => {
            setDied(false);
        }, 4500);
    });

    useMessageEvent<UserArrestedEvent>(UserArrestedEvent, event => {
        const parser = event.getParser();
        if (parser.userId !== userInfo?.userId) {
            return;
        }
        PlaySound(SoundNames.WASTED)
        setArrested(true);
        setTimeout(() => {
            setArrested(false);
        }, 4500);
    });

    return (
        <>
            {
                died && (
                    <div style={rpMessageOverlay.overlay}>
                        <div style={rpMessageOverlay.messageBox}>
                            <div style={{ ...rpMessageOverlay.message, color: 'red' }}>WASTED</div>
                        </div>
                    </div>
                )
            }
            {
                arrested && (
                    <div style={rpMessageOverlay.overlay}>
                        <div style={rpMessageOverlay.messageBox}>
                            <div style={rpMessageOverlay.message}>BUSTED</div>
                        </div>
                    </div>
                )
            }
        </>
    )
}