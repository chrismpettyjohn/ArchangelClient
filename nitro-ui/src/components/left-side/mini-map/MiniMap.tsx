import { useEffect, useState } from 'react';
import { MapData, MapQueryComposer, MapQueryEvent } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../../api';
import { useMessageEvent, useRoom } from '../../../hooks';

const positions = {
    top: { top: '10%', left: '50%' },
    left: { top: '50%', left: '10%' },
    center: { top: '50%', left: '50%' },
    right: { top: '50%', left: '90%' },
    bottom: { top: '90%', left: '50%' }
};

export function MiniMap() {
    const { roomSession } = useRoom();
    const [map, setMap] = useState<MapData[]>([]);

    useEffect(() => {
        if (!roomSession) return;
        console.log('Requesting map data for room:', roomSession.roomId);
        SendMessageComposer(new MapQueryComposer(roomSession.roomId));
    }, [roomSession]);

    useMessageEvent(MapQueryEvent, (event: MapQueryEvent) => {
        const rooms = event.getParser().rooms;
        console.log('Received map data:', rooms);
        setMap(rooms);
    });

    // Always render the container
    return (
        <div className="minimap animate__animated animate__slideInLeft animate__fast glass-panel">
            <div className="inner-map">
                {map.map((room, index) => {
                    // Current room is always at index 0
                    const isStartingRoom = index === 0;
                    const positionKey = isStartingRoom ? 'center' : 
                        Object.keys(positions)[index % Object.keys(positions).length];
                    const position = positions[positionKey];

                    return (
                        <div
                            key={room.id}
                            className={`square ${positionKey}`}
                            style={{
                                ...position,
                                backgroundColor: isStartingRoom ? '#d9b300' : undefined
                            }}
                        >
                            <p>{room.name}</p>
                            {isStartingRoom && (
                                <div className="avatar-image" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}