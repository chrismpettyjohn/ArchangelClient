import { CursorMode } from "@nitro-rp/renderer";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaFistRaised, FaHandshake, FaSync } from "react-icons/fa";
import { GetRoomEngine } from "../../../api";

export function ToggleCursorMode() {
    const [cursor, setCursor] = useState<CursorMode>(GetRoomEngine().getCursorMode());
    const onToggleCursor = useCallback(() => setCursor(_ => _ === CursorMode.Interact ? CursorMode.Attack : CursorMode.Interact), []);

    useEffect(() => {
        GetRoomEngine().setCursorMode(cursor);
    }, [cursor]);

    return (

        <div className="nitro-toggle-cursor-mode">
            <Button variant={cursor === CursorMode.Attack ? 'danger' : 'primary'} onClick={onToggleCursor}>
                {CursorMode.Attack ? <FaFistRaised /> : <FaHandshake />}
                <span style={{ marginLeft: 4 }}>{cursor}</span>
            </Button>
            <Button variant="primary  onClick={WeaponReload}">
                <FaSync style={{ marginRight: 4 }} /> Reload
            </Button>
        </div >
    )
}