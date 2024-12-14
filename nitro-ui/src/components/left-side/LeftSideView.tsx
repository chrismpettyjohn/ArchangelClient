import { GameTools } from './game-tools/GameTools';
import { GameSettings } from './game-settings/GameSettings';
import { RoleplayStatsView } from './roleplay-stats/RoleplayStatsView';
import { MiniMap } from './mini-map/MiniMap';
import { ShiftInventory } from './shift-inventory/ShiftInventory';

export function LeftSideView() {
    return (
        <div className="nitro-left-side">
            <RoleplayStatsView />
            <GameTools />
            <GameSettings />
            <ShiftInventory />
            <MiniMap />
        </div>
    );
}
