import { FaMapPin, FaSkull } from 'react-icons/fa';
import { TurfTimer } from './turf-timer/TurfTimer';
import { useNavigator, useRoom } from '../../hooks';
import { Flex, Text } from '../../common';
import { CreateLinkEvent, SendMessageComposer } from '../../api';
import { useEffect } from 'react';
import { TurfTimerQuery } from '../../api/roleplay/gang/TurfTimerQuery';

export function MiddleView() {
    const { navigatorData = null } = useNavigator();
    const { roomSession = null } = useRoom();

    return (
        <>
            <div className="middle-bar">
                <div className="top-bar glass-panel ">
                    <div className="location-info" onClick={() => CreateLinkEvent('navigator/toggle-room-info')} style={{ cursor: 'pointer' }}>
                        <FaMapPin />
                        <Text fontSize={4} variant="white">
                            {navigatorData?.enteredGuestRoom?.roomName}
                        </Text>
                        <Flex gap={4}>
                            {
                                navigatorData?.enteredGuestRoom?.tags?.map(_ => (
                                    <Text fontSize={5} variant="white">
                                        #{_}
                                    </Text>
                                ))
                            }
                        </Flex>
                    </div>
                    {
                        roomSession?.isGuildRoom && (
                            <div className="player-info">
                                <Text bold className="level-badge" variant="white" fontSize={6}>
                                    <FaSkull style={{ fontSize: 14, marginRight: 8 }} />
                                    Crips
                                </Text>
                            </div>
                        )
                    }
                </div>

                <TurfTimer />
            </div>
        </>
    )
}