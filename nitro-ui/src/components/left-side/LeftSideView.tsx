import { GameTools } from './game-tools/GameTools';
import { GameSettings } from './game-settings/GameSettings';
import { RoleplayStatsView } from './roleplay-stats/RoleplayStatsView';

export function LeftSideView() {
    return (
        <div className="nitro-left-side">
            <RoleplayStatsView />
            <GameTools />
            <GameSettings />
        </div>
    );
}
