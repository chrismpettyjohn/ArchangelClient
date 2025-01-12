import { GameTools } from './game-tools/GameTools';
import { GameSettings } from './game-settings/GameSettings';
import { RoleplayStatsView } from './roleplay-stats/RoleplayStatsView';
import { NotificationCenterView } from '../notification-center/NotificationCenterView';
import { GameMap } from './game-map/GameMap';

export function LeftSideView() {
    return (
        <div className="nitro-left-side">
            <RoleplayStatsView />
            <GameTools />
            <GameSettings />
            <NotificationCenterView />
            <GameMap />
        </div>
    );
}
