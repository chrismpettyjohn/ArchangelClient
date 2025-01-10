import { FC, useMemo } from 'react';
import { Column } from '../../../../common';
import { useRoleplayStats } from '../../../../hooks/roleplay/use-rp-stats';

interface HealthBarViewProps {
    userId: number;
    position: { x: number; y: number } | null;
}

export const HealthBarView: FC<HealthBarViewProps> = props => {
    const rpStats = useRoleplayStats(props.userId);

    const healthPercent = useMemo(() => {
        const healthMax = Math.max(rpStats.healthMax, 100);
        const healthPercent = (rpStats.healthNow / healthMax) * 100;
        return healthPercent;
    }, [rpStats.healthMax, rpStats.healthNow]);

    if (!props.position) return null;

    return (
        <Column className="health-bar-container nitro-room-user-health" style={{
            position: 'absolute',
            left: `${props.position.x}px`,
            top: `${props.position.y - 10}px`,
            width: '50px',
            transform: 'translate(-50%, -1900%)'
        }}>
            <div className="health-bar-background" style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#333',
                borderRadius: '2px'
            }}>
                <div className="health-bar-fill" style={{
                    width: `${healthPercent}%`,
                    height: '100%',
                    backgroundColor: '#2ecc71',
                    borderRadius: '2px',
                    transition: 'width 0.3s ease'
                }} />
            </div>
        </Column>
    );
}