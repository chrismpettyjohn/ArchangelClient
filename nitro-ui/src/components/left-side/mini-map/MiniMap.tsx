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

    console.log('Map: ', map);

    const startRoom = map[0];
    return (
        <div className="mini-map">
            <div className="map-container">
                {startRoom && map && (
                    <>
                        <div
                            className="room"
                            key={startRoom.name}
                            data-room-name={startRoom.name}
                            style={{
                                top: `${50 + startRoom.y * 50}%`,
                                left: `${50 + startRoom.x * 50}%`,
                            }}
                        />
                        {map
                            .map((room) => (
                                <div
                                    className="room"
                                    key={room.name}
                                    data-room-name={room.name}
                                    style={{ top: `${50 + room.y * 50}%`, left: `${50 + room.x * 50}%` }}
                                />
                            ))}
                    </>
                )}
            </div>
        </div>
    );
}