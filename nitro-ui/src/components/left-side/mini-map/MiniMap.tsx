import { useEffect, useState } from 'react';
import { MapData, MapQueryComposer, MapQueryEvent } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../../api';
import { useMessageEvent, useRoom } from '../../../hooks';

export function MiniMap() {
    const { roomSession } = useRoom();
    const [map, setMap] = useState<MapData[]>([]);

    useEffect(() => {
        if (!roomSession) return;
        SendMessageComposer(new MapQueryComposer(roomSession.roomId));
    }, [roomSession]);

    useMessageEvent(MapQueryEvent, (event: MapQueryEvent) => {
        setMap(event.getParser().rooms);
    });

    const startingRoom = map[0];

    return (
        <div className="minimap animate__animated animate__slideInLeft animate__fast glass-panel">
            <div className="inner-map">
                {map.map((room, index) => {
                    const isStartingRoom = room.id === startingRoom?.id;

                    if (isStartingRoom) {
                        return (
                            <div
                                key={index}
                                className="square center"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    backgroundColor: '#d9b300'
                                }}
                            >
                                <p>{room.name}</p>
                            </div>
                        );
                    }

                    const teleportIndex = startingRoom.doorTargetRooms.indexOf(room.id);
                    if (teleportIndex === -1) return null;

                    const teleX = startingRoom.doorX[teleportIndex];
                    const teleY = startingRoom.doorY[teleportIndex];
                    const centerX = startingRoom.maxX / 2;
                    const centerY = startingRoom.maxY / 2;

                    let position;
                    if (Math.abs(teleY - centerY) > Math.abs(teleX - centerX)) {
                        // Vertical offset is larger
                        position = teleY < centerY ? 
                            { top: '25%', left: '50%' } :  // Moved up more
                            { top: '75%', left: '50%' };   // Moved down more
                    } else {
                        // Horizontal offset is larger
                        position = teleX < centerX ? 
                            { top: '50%', left: '25%' } :  // Moved left more
                            { top: '50%', left: '75%' };   // Moved right more
                    }

                    return (
                        <div
                            key={index}
                            className="square"
                            style={position}
                        >
                            <p>{room.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}