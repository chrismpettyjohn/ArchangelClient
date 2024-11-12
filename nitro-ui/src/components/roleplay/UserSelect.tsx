import { useEffect, useState } from "react";
import Select from "react-select";
import { useMessageEvent } from "../../hooks";
import { RoomListUsersEvent, RoomUsersListRow } from "@nitro-rp/renderer";
import { RoomListUsers } from "../../api/roleplay/room/RoomListUsers";
import { getSelectDarkTheme, SELECT_DARK_THEME } from "./select.base";

export interface UserSelectProps {
    userID?: number;
    onChange(newUser: RoomUsersListRow): void;
}

export function UserSelect({ userID, onChange }: UserSelectProps) {
    const [users, setUsers] = useState<Array<RoomUsersListRow>>([]);

    useEffect(() => {
        RoomListUsers();
    }, []);

    useMessageEvent<RoomListUsersEvent>(RoomListUsersEvent, event => {
        setUsers(event.getParser().users);
    });

    const userOptions = users.map(user => ({
        value: user.id,
        label: user.username,
    }));

    function onChangeUser(selectedOption: any) {
        const matchingUser = users.find(_ => _.id === selectedOption?.value);
        if (!matchingUser) return;
        onChange(matchingUser);
    }

    return (
        <Select
            options={userOptions}
            value={userOptions.find(option => option.value === userID)}
            onChange={onChangeUser}
            placeholder="Select a user"
            styles={SELECT_DARK_THEME}
            theme={getSelectDarkTheme}
        />
    );
}
