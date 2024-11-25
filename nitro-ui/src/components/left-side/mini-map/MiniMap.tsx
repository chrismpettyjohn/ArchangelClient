import { useEffect, useState } from 'react';
import { MapData, MapQueryComposer, MapQueryEvent } from '@nitro-rp/renderer';
import { SendMessageComposer } from '../../../api';
import { useMessageEvent, useRoom } from '../../../hooks';

const positions = {
    top: { top: '10%', left: '50%' },
    left: { top: '50%', left: '10%' },
    center: { top: '50%', left: '50%' },
    right: { top: '50%', left: '90%' },
    bottom: { top: '90%', left: '50%' },
};

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

    const startingRoom = map[0];

    return (
        <div className="minimap animate__animated animate__slideInLeft animate__fast">
            <div className="inner-map">
                {map.map((room, index) => {
                    const isStartingRoom = room.id === startingRoom.id;
                    const positionKey = isStartingRoom ? 'center' : Object.keys(positions)[index % Object.keys(positions).length];
                    const position = positions[positionKey] || positions.center;

                    return (
                        <div
                            key={index}
                            className={`square ${positionKey}`}
                            style={position}
                        >
                            <p>{room.name}</p>
                            {isStartingRoom && (
                                <div
                                    className="avatar-image"
                                    style={{
                                        width: '25px',
                                        height: '25px',
                                        backgroundPosition: '-12px -19px',
                                        backgroundSize: '205%',
                                        imageRendering: 'auto',
                                        marginLeft: '-23px',
                                        transform: 'rotateZ(45deg)',
                                        backgroundImage:
                                            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAACCCAYAAADGxd9AAAAAAXNSR0IArs4c6QAABApJREFUeF7t2CFvFEEYxvEpjtTUUUOoA4JpEAhUDR+BpAqDwtTj6vA1KAyqCR8BU4VAkBrCIQmmuJoGR8m7ubnMTXfndnvked+G/yVNL7d7++z87tnZudtIPCQCG5IUQhLQohIADbRIQBRDo4EWCYhiaDTQIgFRDI0GWiQgiqHRQIsERDE0GmiRgCiGRgMtEhDF0GigRQKiGBoNtEhAFEOjgRYJiGJoNNAiAVEMjQZaJCCKodFAiwREMTQaaJGAKIZGAy0SEMXQaKBFAqIYGg20SEAUc9MafTngEn4c4U8wpTSEm3Z2drq/k5OT0j/kmEKe1FxtAby3t5fOz8+7l7e2tmrYoYs/1NhCnUwhttTi/f39btPZ2Vn339BHgocZX5gT6UPOwMfHx93m3OzT09Mpt7AQYwxxEjWygW5vb6cSODd5FfLu7m6yffL/+bHdx+l+AjVyBZSu0+qI2OGgyznBmm0PW1XY82p10Zw+evZ3Hatr+NDNz14vm53RpszR9v58w7SrYj4NuY3XLbiq4+BauUSe0mg7vgHPZrNyheI2XrfgVpunLCla+9bzveeNMTR0PX3Y+nnVqqOG77kiXMbsEjp22shztf1fBTx0s8wfVrHdZcwuoWOhBy79qauNen+XMbuEjoVuif75/Hax+daTV0u79rWbRjd+neuDLoHL7WOwuRmOWGYMAddvrcF7Du1yFbuETpk6xgK32l3luYzZJXQM9HWAR2K7jNkldBV060ZXfwD1VNF6L3N0Sunbh8PO4eHzw5SxDPHNy6fp4Ohjt+3o4Fl6/e7TpO12rO8/fnXH/d+hbfzdbx2GXULba78fvUibm5ud0cXFRbr99f3SBdHabh9UPqYnsmVHmDoW0PaknhrWgbbjVVOL23jdgnuWXYtf8ErsdaCjIEdqdHbvsNddceSDFdDuhXI/gb5mt6C/zH6mxw/udm8rn/ccJ08bIcYY4iSmYuemtj6Q+T5hxhfmROq19brTB9B91/jV1y6BHgf1L/a6gj30g9HAt8VQV2uokxkzfdgNsHzkG2P5WrRpI+Lyrr4SLu2b3f17d0ZdIcVX7XAFCndCQ19kWuARfstY1YSbAL30ZaYxoNBjCX1yq1pyk7YDLfq0gAZaJCCKodFAiwREMTQaaJGAKIZGAy0SEMXQaKBFAqIYGg20SEAUQ6OBFgmIYmg00CIBUQyNBlokIIqh0UCLBEQxNBpokYAohkYDLRIQxdBooEUCohgaDbRIQBRDo4EWCYhiaDTQIgFRDI0GWiQgiqHRQIsERDE0GmiRgCiGRgMtEhDF0GigRQKiGBoNtEhAFEOjgRYJiGJoNNAiAVEMjQZaJCCKodFAiwREMTQaaJGAKIZGAy0SEMXQaBH0X34aS5LfErABAAAAAElFTkSuQmCC")',
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}