import { GameTools } from './game-tools/GameTools';
import { GameSettings } from './game-settings/GameSettings';
import { RoleplayStatsView } from './roleplay-stats/RoleplayStatsView';
import { MiniMap } from './mini-map/MiniMap';
import { NotificationCenterView } from '../notification-center/NotificationCenterView';

export function LeftSideView() {
    return (
        <div className="nitro-left-side">
            <RoleplayStatsView />
            <GameTools />
            <GameSettings />
            <NotificationCenterView />
            <MiniMap />
        </div>
    );
}
