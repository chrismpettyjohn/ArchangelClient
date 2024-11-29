import { useMemo, useState, useEffect } from "react";
import { useTurfTimer } from "../../../hooks/roleplay/use-turf-timer";
import { useSessionInfo } from "../../../hooks";
import { useRoleplayStats } from "../../../hooks/roleplay/use-rp-stats";

export function TurfTimer() {
    const timer = useTurfTimer();
    const { userInfo } = useSessionInfo();
    const rpStats = useRoleplayStats(userInfo?.userId);
    const [timeLeft, setTimeLeft] = useState(0);
    const [markerPosition, setMarkerPosition] = useState(50); // Start at the middle

    useEffect(() => {
        if (timer.finishesAt > 0) {
            const updateCountdown = () => {
                const remainingTime = Math.max(0, Math.ceil((timer.finishesAt - Date.now()) / 1000));
                setTimeLeft(remainingTime);

                const totalDuration = Math.max(1, timer.finishesAt - Date.now() + remainingTime * 1000); // Avoid division by 0
                const progressFraction = 1 - remainingTime / (totalDuration / 1000);

                const basePosition = 50; // Middle of the bar
                const targetShift = timer.capturingGangId === rpStats.gangID ? -50 : 50; // Toward blue if ally
                setMarkerPosition(basePosition + targetShift * progressFraction);
            };

            updateCountdown(); // Initial calculation
            const interval = setInterval(updateCountdown, 1000);
            return () => clearInterval(interval); // Cleanup
        }
    }, [timer.finishesAt, timer.capturingGangId, rpStats.gangID]);

    const { allyPlayers, enemyPlayers } = useMemo(() => {
        const gangs = timer.gangs || [];
        const ally = gangs.find(g => g.gangId === (rpStats.gangID || 0))?.userCount || 0;
        const enemy = gangs.reduce((total, gang) =>
            gang.gangId !== rpStats.gangID ? total + gang.userCount : total, 0);
        return { allyPlayers: ally, enemyPlayers: enemy };
    }, [timer.gangs, rpStats.gangID]);

    if (!timer.finishesAt || timeLeft <= 0) return null;

    const totalPlayers = allyPlayers + enemyPlayers;
    const allyPercentage = totalPlayers ? (allyPlayers / totalPlayers) * 100 : 0;
    const enemyPercentage = 100 - allyPercentage;

    const progressBarClasses = `progress-bar${timer.isCapturing ? '' : ' contested'}`;

    return (
        <div className="game-hud glass-panel">
            <div className="objective">
                {timeLeft}<small style={{ fontSize: 14 }}>s</small>
            </div>
            <div className="score-bar">
                <div className="team blue">
                    <span className="score">{allyPlayers}</span>
                </div>
                <div className={progressBarClasses}>
                    <div className="progress blue" style={{ width: `${allyPercentage}%` }}></div>
                    <div className="marker" style={{ left: `${markerPosition}%` }}></div>
                    <div className="progress red" style={{ width: `${enemyPercentage}%` }}></div>
                    {!timer.isCapturing && <div className="contested-overlay">CONTESTED</div>}
                </div>
                <div className="team red">
                    <span className="score">{enemyPlayers}</span>
                </div>
            </div>
        </div>
    );
}
