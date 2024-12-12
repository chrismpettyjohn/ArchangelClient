import { useEffect, useState } from 'react';
import { RoomReadyMessageEvent, RoomSessionEvent, IRoomSession } from '@nitro-rp/renderer';
import { GetNitroInstance } from '../../../api';

export const useRoomTransition = () => {
    const [isNewRoomReady, setIsNewRoomReady] = useState(false);
    const [previousRoomSession, setPreviousRoomSession] = useState<IRoomSession>(null);
    
    useEffect(() => {
        const nitro = GetNitroInstance();
        
        // Listen for room ready message
        const onRoomReady = (event: RoomReadyMessageEvent) => {
            setIsNewRoomReady(true);
        };
        
        // Listen for room session changes
        const onRoomSessionEvent = (event: RoomSessionEvent) => {
            switch(event.type) {
                case RoomSessionEvent.CREATED:
                    setIsNewRoomReady(false);
                    setPreviousRoomSession(event.session);
                    break;
                case RoomSessionEvent.ENDED:
                    setPreviousRoomSession(null);
                    break;
            }
        };

        // Add event listeners
        nitro.communication.connection.addMessageEvent(new RoomReadyMessageEvent(onRoomReady));
        nitro.roomSessionManager.events.addEventListener(RoomSessionEvent.CREATED, onRoomSessionEvent);
        nitro.roomSessionManager.events.addEventListener(RoomSessionEvent.ENDED, onRoomSessionEvent);

        return () => {
            // Clean up event listeners
            nitro.roomSessionManager.events.removeEventListener(RoomSessionEvent.CREATED, onRoomSessionEvent);
            nitro.roomSessionManager.events.removeEventListener(RoomSessionEvent.ENDED, onRoomSessionEvent);
        };
    }, []);

    return { isNewRoomReady, previousRoomSession };
};