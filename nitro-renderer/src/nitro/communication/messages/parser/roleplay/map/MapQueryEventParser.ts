import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface MapData {
    id: number;
    name: string;
    x: number;
    y: number;
    size: number;
}

export class MapQueryEventParser implements IMessageParser {
    private _rooms: MapData[];

    public flush(): boolean {
        this._rooms = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        try {
            const roomCount = wrapper.readInt();
            const rooms: MapData[] = [];

            for (let i = 0; i < roomCount; i++) {
                const roomData = wrapper.readString().split(";");
                rooms.push({
                    id: parseInt(roomData[0], 10),
                    name: roomData[1],
                    x: parseInt(roomData[2], 10),
                    y: parseInt(roomData[3], 10),
                    size: parseInt(roomData[4], 10),
                });
            }

            this._rooms = rooms;
        } catch (e: any) {
            console.log(e);
            throw e;
        }

        return true;
    }

    public get rooms(): MapData[] {
        return this._rooms;
    }
}