import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface RoomUsersListRow {
    id: number;
    username: string;
}

export class RoomUsersListEventParser implements IMessageParser {
    private _users: Array<RoomUsersListRow> = [];

    public flush(): boolean {
        this._users = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalUsers = wrapper.readInt();

        for (let i = 0; i < totalUsers; i++) {
            const [id, username] = wrapper.readString().split(';');
            this._users.push({ id: Number(id), username });
        }

        return true;
    }

    public get users(): Array<RoomUsersListRow> {
        return this._users;
    }

}
