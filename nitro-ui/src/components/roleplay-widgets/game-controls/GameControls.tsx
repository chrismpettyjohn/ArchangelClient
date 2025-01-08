import { useState, useEffect, useCallback, useMemo } from "react";
import { MovementDirection, UserMovementComposer } from "@nitro-rp/renderer";
import { WeaponReload } from "../../../api/roleplay/combat/WeaponReload";
import { FocusMode, useSharedUI } from "../../../context/shared-ui";
import { SendMessageComposer } from "../../../api";

export const GAME_CONTROLS_ID = 'game-controls';

export function GameControls() {
    const { focus } = useSharedUI();
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [activeDirection, setActiveDirection] = useState<MovementDirection | null>(null);
    const isActive = useMemo(() => focus === FocusMode.Controls, [focus]);

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
            SendMessageComposer(new UserMovementComposer(MovementDirection.STOP))
            setActiveDirection(MovementDirection.STOP);
            return;
        }

        if (direction !== activeDirection) {
            SendMessageComposer(new UserMovementComposer(direction))
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

    return null
}
