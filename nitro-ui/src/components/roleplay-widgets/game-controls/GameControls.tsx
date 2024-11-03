import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { MovementDirection } from "@nitro-rp/renderer";
import { UserMovement } from "../../../api/roleplay/controls/UserMovement";
import { FaCaretSquareDown, FaCaretSquareLeft, FaCaretSquareRight, FaCaretSquareUp } from "react-icons/fa";
import { WeaponReload } from "../../../api/roleplay/combat/WeaponReload";
import { FocusMode, useSharedUI } from "../../../context/shared-ui";

export const GAME_CONTROLS_ID = 'game-controls';

export function GameControls() {
    const { focus } = useSharedUI();
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [activeDirection, setActiveDirection] = useState<MovementDirection | null>(null);
    const controlRef = useRef<HTMLDivElement>(null);
    const isActive = useMemo(() => focus === FocusMode.Controls, [focus]);


    useEffect(() => {
        if (!isActive) {
            return;
        }
        controlRef.current?.focus();
    }, [isActive]);

    useEffect(() => {
        if (isActive) {
            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('keyup', onKeyUp);
        }

        if (!isActive) {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        }

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [isActive, activeDirection, activeKey]);

    const onMove = useCallback((direction: MovementDirection) => {
        if (!isActive) return;
        if (direction === activeDirection) {
            setActiveKey(null);
            UserMovement(MovementDirection.STOP);
            setActiveDirection(MovementDirection.STOP);
            return;
        }

        if (direction !== activeDirection) {
            UserMovement(direction);
            setActiveDirection(direction);
        }
    }, [isActive, activeDirection, setActiveKey, setActiveDirection]);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (!isActive) return;

        const key = event.key.toLowerCase();

        if (key !== activeKey) {
            setActiveKey(key);

            switch (key) {
                case 'w':
                case "arrowup":
                    onMove(MovementDirection.UP);
                    break;
                case 'a':
                case "arrowleft":
                    onMove(MovementDirection.LEFT);
                    break;
                case 's':
                case "arrowdown":
                    onMove(MovementDirection.DOWN);
                    break;
                case 'd':
                case "arrowright":
                    onMove(MovementDirection.RIGHT);
                    break;
                case 'r':
                    WeaponReload();
                    break;
                default:
                    break;
            }
        }
    }, [isActive, setActiveKey, onMove]);

    const onKeyUp = useCallback((event: KeyboardEvent) => {
        if (!isActive) return;
        const key = event.key.toLowerCase();

        if (key === activeKey) {
            setActiveKey(null);
            onMove(MovementDirection.STOP);
            setActiveDirection(null);
        }
    }, [isActive, focus, activeKey, setActiveKey, onMove, setActiveDirection]);

    return (
        <div
            ref={controlRef}
            tabIndex={0}
            id={GAME_CONTROLS_ID}
            style={{
                zIndex: 100,
                pointerEvents: 'all',
                position: 'absolute',
                bottom: 40,
                left: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                outline: 'none',
            }}
        >
            <div onClick={() => onMove(MovementDirection.UP)} style={{ cursor: 'pointer', color: activeDirection === MovementDirection.UP ? 'cyan' : 'white' }}>
                <FaCaretSquareUp size={40} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120 }}>
                <div onClick={() => onMove(MovementDirection.LEFT)} style={{ cursor: 'pointer', color: activeDirection === MovementDirection.LEFT ? 'cyan' : 'white' }}>
                    <FaCaretSquareLeft size={40} />
                </div>
                <div onClick={() => onMove(MovementDirection.DOWN)} style={{ cursor: 'pointer', color: activeDirection === MovementDirection.DOWN ? 'cyan' : 'white' }}>
                    <FaCaretSquareDown size={40} />
                </div>
                <div onClick={() => onMove(MovementDirection.RIGHT)} style={{ cursor: 'pointer', color: activeDirection === MovementDirection.RIGHT ? 'cyan' : 'white' }}>
                    <FaCaretSquareRight size={40} />
                </div>
            </div>
        </div >
    );
}
