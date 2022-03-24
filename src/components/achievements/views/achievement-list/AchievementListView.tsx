import { AchievementData } from '@nitrots/nitro-renderer';
import { Dispatch, FC, SetStateAction } from 'react';
import { AutoGrid } from '../../../../common';
import { AchievementListItemView } from './AchievementListItemView';

export interface AchievementListViewProps
{
    achievements: AchievementData[];
    selectedAchievementId: number;
    setSelectedAchievementId: Dispatch<SetStateAction<number>>;
}

export const AchievementListView: FC<AchievementListViewProps> = props =>
{
    const { achievements = null, selectedAchievementId = 0, setSelectedAchievementId = null, children = null } = props;

    return (
        <AutoGrid columnCount={ 6 } columnMinWidth={ 50 } columnMinHeight={ 50 }>
            { achievements && (achievements.length > 0) && achievements.map((achievement, index) => <AchievementListItemView key={ index } achievement={ achievement } itemActive={ (selectedAchievementId === achievement.achievementId) } itemUnseen={ (achievement.unseen > 0) } onClick={ event => setSelectedAchievementId(achievement.achievementId) } />) }
            { children }
        </AutoGrid>
    );
}
