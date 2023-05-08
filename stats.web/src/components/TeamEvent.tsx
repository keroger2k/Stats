import { Link } from 'react-router-dom';
import { GameDataResponse } from '../models/models';


function NonGameEvent(props: any) {
    const gameTime = props.time;
    return <span className="Text__text Text__left Text__off-black Text__base Text__regular ScheduleListByMonth__time ScheduleListByMonth__scoreOrTimeText">{gameTime}</span>;
                            
}

function GameEvent(props: any) {
    var result = props.score[0]?.game_data?.team_score! > props.score[0]?.game_data?.opponent_score! ? "W" : props.score[0]?.game_data?.team_score! === props.score[0]?.game_data?.opponent_score! ? "T" : "L";
    var crap = result === "W" ? "win" : result === "L" ? "loss" : "tie";
    return <span className={ `Text__text Text__left Text__off-black Text__base Text__semibold EventScore__${crap} ScheduleListByMonth__scoreOrTimeText` } >{`${result} ${props.score[0]?.game_data?.team_score}-${props.score[0]?.game_data?.opponent_score}`}</span>
}


function TeamEvent(props: any) {
    const isGame = props.isGame;
    const gameTime = props.time;
    const gameScore = props.score;

    if (isGame && props.score[0] && props.score[0].game_data) {
        return <GameEvent score={ gameScore } />;
    }
    return <NonGameEvent time={gameTime} />;
}

export default TeamEvent;
