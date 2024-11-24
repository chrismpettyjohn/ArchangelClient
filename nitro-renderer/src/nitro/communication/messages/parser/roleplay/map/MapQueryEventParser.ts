import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface MapData {
    startRoomName: string;
    rooms: { x: number; y: number; name: string; connectedRooms: { x: number; y: number; name: string }[] }[];
}

export class MapQueryEventParser implements IMessageParser {
    private _map: MapData;

    public flush(): boolean {
        this._map = { startRoomName: "", rooms: [] };
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        try {
            console.log('oh??')
            this._map.startRoomName = wrapper.readString();

            const roomCount = wrapper.readInt();
            const rooms = [];
            for (let i = 0; i < roomCount; i++) {
                const x = wrapper.readInt();
                const y = wrapper.readInt();
                const name = wrapper.readString();

                const connectedRoomCount = wrapper.readInt();
                const connectedRooms = [];
                for (let j = 0; j < connectedRoomCount; j++) {
                    connectedRooms.push({
                        x: wrapper.readInt(),
                        y: wrapper.readInt(),
                        name: wrapper.readString(),
                    });
                }

                rooms.push({ x, y, name, connectedRooms });
            }
            this._map.rooms = rooms;
        } catch (e: any) {
            console.log(e);
            throw e;
        }

        return true;
    }

    public get map(): MapData {
        return this._map;
    }
}