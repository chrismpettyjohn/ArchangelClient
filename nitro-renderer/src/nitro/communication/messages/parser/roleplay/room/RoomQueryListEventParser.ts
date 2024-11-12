import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface RoomListRow {
    id: number;
    name: string;
}

export class RoomQueryListEventParser implements IMessageParser {
    private _rooms: Array<RoomListRow> = [];

    public flush(): boolean {
        this._rooms = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalRooms = wrapper.readInt();

        for (let i = 0; i < totalRooms; i++) {
            const [id, name] = wrapper.readString().split(';');
            this._rooms.push({ id: Number(id), name });
        }

        return true;
    }

    public get rooms(): Array<RoomListRow> {
        return this._rooms;
    }

}
