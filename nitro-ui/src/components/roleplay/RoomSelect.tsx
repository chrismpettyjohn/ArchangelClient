import { useEffect, useState } from "react";
import Select from "react-select";
import { useMessageEvent } from "../../hooks";
import { RoomListRow, RoomQueryListComposer, RoomQueryListEvent } from "@nitro-rp/renderer";
import { SendMessageComposer } from "../../api";
import { getSelectDarkTheme, SELECT_DARK_THEME } from "./select.base";

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

    const roomOptions = rooms.map(room => ({
        value: room.id,
        label: room.name,
    }));

    function onChangeRoom(selectedOption: any) {
        const matchingRoom = rooms.find(_ => _.id === selectedOption?.value);
        if (matchingRoom) {
            onChange(matchingRoom.id);
        }
    }

    return (
        <Select
            options={roomOptions}
            value={roomOptions.find(option => option.value === roomID)}
            onChange={onChangeRoom}
            placeholder="Select a room"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}
