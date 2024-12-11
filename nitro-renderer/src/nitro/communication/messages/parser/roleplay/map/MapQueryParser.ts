import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export interface MapData {
    id: number;
    name: string;
    x: number;
    y: number;
    maxX: number;
    maxY: number;
    doorX: number[];
    doorY: number[];
    doorTargetX: number[];
    doorTargetY: number[];
    doorTargetRooms: number[];
}

export class MapQueryParser implements IMessageParser {
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
                const roomData = wrapper.readString().split(';');
                const doorCount = parseInt(roomData[6], 10);

                const doorX: number[] = [];
                const doorY: number[] = [];
                const doorTargetX: number[] = [];
                const doorTargetY: number[] = [];
                const doorTargetRooms: number[] = [];

                let offset = 7;
                for (let j = 0; j < doorCount; j++) {
                    doorX.push(parseInt(roomData[offset++], 10));
                    doorY.push(parseInt(roomData[offset++], 10));
                    doorTargetX.push(parseInt(roomData[offset++], 10));
                    doorTargetY.push(parseInt(roomData[offset++], 10));
                    doorTargetRooms.push(parseInt(roomData[offset++], 10));
                }

                rooms.push({
                    id: parseInt(roomData[0], 10),
                    name: roomData[1],
                    x: parseInt(roomData[2], 10),
                    y: parseInt(roomData[3], 10),
                    maxX: parseInt(roomData[4], 10),
                    maxY: parseInt(roomData[5], 10),
                    doorX,
                    doorY,
                    doorTargetX,
                    doorTargetY,
                    doorTargetRooms
                });
            }

            this._rooms = rooms;
        } catch (e) {
            console.error('MapQueryParser.parse error:', e);
            return false;
        }

        return true;
    }

    public get rooms(): MapData[] {
        return this._rooms;
    }
}