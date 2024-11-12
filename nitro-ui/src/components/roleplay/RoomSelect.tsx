import { ChangeEvent, useEffect, useState } from "react";
import { useMessageEvent } from "../../hooks";
import { RoomListRow, RoomQueryListComposer, RoomQueryListEvent } from "@nitro-rp/renderer";
import { SendMessageComposer } from "../../api";

export interface RoomSelectProps {
    roomID?: number;
    onChange(newRoomID: number): void;
}

export function RoomSelect({ roomID, onChange }: RoomSelectProps) {
    const [rooms, setRooms] = useState<Array<RoomListRow>>([]);

    useEffect(() => {
        SendMessageComposer(new RoomQueryListComposer());
    }, []);

    useMessageEvent<RoomQueryListEvent>(RoomQueryListEvent, event => {
        setRooms(event.getParser().rooms);
    });

    function onChangeRoom(event: ChangeEvent<HTMLSelectElement>) {
        const matchingRoom = rooms.find(_ => _.id === Number(event.currentTarget.value));
        if (!matchingRoom) {
            return;
        }
        onChange(matchingRoom.id);
    }

    return (
        <select className="form-control form-control-sm" value={roomID} onChange={onChangeRoom}>
            {
                !roomID && <option selected disabled>Select a room</option>
            }
            {
                rooms.map(room => (
                    <option key={`room_${room.id}`} value={room.id}>
                        {room.name}
                    </option>
                ))
            }
        </select>
    )
}