import { FaMapPin, FaSkull } from 'react-icons/fa';
import { TurfTimer } from './turf-timer/TurfTimer';
import { useNavigator } from '../../hooks';
import { Flex, Text } from '../../common';
import { CreateLinkEvent } from '../../api';

export function MiddleView() {
    const { navigatorData = null } = useNavigator();
    return (
        <>
            <div className="middle-bar">
                <div className="top-bar glass-panel">
                    <div className="location-info" onClick={() => CreateLinkEvent('navigator/toggle-room-info')} style={{ cursor: 'pointer' }}>
                        <FaMapPin />
                        <Text fontSize={4} variant="white">
                            {navigatorData?.enteredGuestRoom?.roomName}
                        </Text>
                        <Flex gap={4}>
                            {
                                navigatorData?.enteredGuestRoom?.tags?.map(_ => (
                                    <Text fontSize={5} variant="white" key={`tag_${_}`}>
                                        #{_}
                                    </Text>
                                ))
                            }
                        </Flex>
                    </div>
                    {
                        navigatorData?.enteredGuestRoom?.gangId ? (
                            <div className="player-info">
                                <Text bold className="level-badge" variant="white" fontSize={6}>
                                    <FaSkull style={{ fontSize: 14, marginRight: 8 }} />
                                    {navigatorData.enteredGuestRoom.gangName}
                                </Text>
                            </div>
                        ) : ''
                    }
                </div>

                <TurfTimer />
            </div>
        </>
    )
}