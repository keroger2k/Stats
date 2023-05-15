import { Event, GameData, Team, GameState } from '../../models/models';
import { ScoreBlock } from './ScoreBlock';


export interface EventDetailsProps {
    event: Event,
    team: Team,
    gameData: GameData
}

export const EventDetails = ({ event, team, gameData }: EventDetailsProps) => {
    const isGame = event.event.event_type === 'game';
    const hasGameData = !!gameData;

    const isGameOver = gameData?.game_state === GameState.GAME_OVER;
    const shouldShowGameStatus = (isGame && isGameOver);
    const shouldShowScoreBlock = hasGameData && shouldShowGameStatus;

    return (
        <ScoreBlock hide={!shouldShowScoreBlock} event={event} team={team} gameData={gameData} />
    );
};
