import { RoomDataParser } from '@nitro-rp/renderer';
import { FaCaretRight, FaClock, FaDollarSign, FaShieldAlt, FaUser } from 'react-icons/fa';
import { Flex, LayoutGridItemProps, Text } from '../../../../common';
import { useMessageEvent, useRoom, useSessionInfo } from '../../../../hooks';
import { TaxiDispatchedEvent } from '@nitro-rp/renderer/src/nitro/communication/messages/incoming/roleplay/taxi/TaxiDispatchedEvent';
import { useCallback, useEffect, useState } from 'react';
import { useRoleplayStats } from '../../../../hooks/roleplay/use-rp-stats';

export enum RoomType {
    TAXI = "taxi",
    TURF = "turf"
}

export interface NavigatorSearchResultItemViewProps extends LayoutGridItemProps {
    disabled: boolean;
    roomData: RoomDataParser;
    onVisitRoom(): void;
    taxiFee: number;
    canSeeAllRooms: boolean;
}

export function NavigatorSearchResultItemView({ canSeeAllRooms, roomData, disabled, onVisitRoom, taxiFee, ...rest }) {
    const session = useSessionInfo();
    const rpStats = useRoleplayStats(session.userInfo.userId);
    const { roomSession } = useRoom();
    const [arrivesAt, setArrivesAt] = useState<number>();
    const [remainingSecs, setRemainingSecs] = useState<number>(0);

    const canPayTaxiFee = rpStats.cashBalance >= taxiFee;

    const isCurrentRoom = roomData?.roomId === roomSession?.roomId;

    const isDisabled = disabled || arrivesAt || !canPayTaxiFee || isCurrentRoom;

    const onAttemptTaxi = useCallback(() => {
        if (!canPayTaxiFee) {
            return;
        }
        onVisitRoom();
    }, [canPayTaxiFee, onVisitRoom]);

    useMessageEvent<TaxiDispatchedEvent>(TaxiDispatchedEvent, event => {
        const parser = event.getParser();
        if (!parser) return;
        if (parser.roomID === roomData.roomId) {
            setArrivesAt(parser.arrivesAt);
            return;
        }
        if (arrivesAt) {
            setArrivesAt(null);
        }
    });

    useEffect(() => {
        if (arrivesAt === null || arrivesAt === undefined) return;

        const updateRemainingSecs = () => {
            const currentTime = Math.floor(Date.now() / 1000);
            const diffSecs = arrivesAt - currentTime;
            if (diffSecs <= 0) {
                setRemainingSecs(0);
                setArrivesAt(null);
                return;
            }
            setRemainingSecs(diffSecs);
        };

        updateRemainingSecs();

        const interval = setInterval(updateRemainingSecs, 1000);

        return () => clearInterval(interval);
    }, [arrivesAt]);

    if (!roomData) {
        return null;
    };

    if (!roomData.tags.includes(RoomType.TAXI) && !canSeeAllRooms) {
        return null;
    }

    return (
        <Flex pointer overflow="hidden" alignItems="center" onClick={onAttemptTaxi} gap={2} className={`navigator-item px-2 py-1 small ${isDisabled ? 'navigator-item-disabled' : ''}`} {...rest}>
            <Flex center className="badge p-1 bg-primary" gap={1}>
                <FaUser className="fa-icon" />
                {roomData.userCount}
            </Flex>
            <Text truncate grow>{roomData.roomName}</Text>
            {!!arrivesAt && (
                <Flex center className="badge p-1 bg-success" gap={1}>
                    <FaClock className="fa-icon" />
                    {remainingSecs} secs
                </Flex>
            )}
            {
                !arrivesAt && !disabled && !canSeeAllRooms && (
                    <Flex center className="badge p-1 bg-danger" gap={1}>
                        <FaDollarSign className="fa-icon" />
                        {taxiFee}
                    </Flex>
                )
            }
            {
                canSeeAllRooms && (
                    <Flex center className="badge p-1 bg-success" gap={1}>
                        <FaCaretRight className="fa-icon" />
                    </Flex>
                )
            }
        </Flex>
    );
}