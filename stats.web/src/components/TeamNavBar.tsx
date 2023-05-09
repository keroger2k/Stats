import { Link } from "react-router-dom";
import BaseballLogo from "./BaseballLogo";
import { GameDataResponse } from "../models/models";

function TeamNavBar(props: any) {
    return (
        <div className="TeamNavBar__navBar">
            <div className="TeamInfoSection__teamInfo" data-testid="TeamInfoSection">
                <div className="Avatar__container Avatar__white-background Avatar__large TeamInfoSection__teamAvatar TeamInfoSection__teamCustomAvatar">
                    <div className="Avatar__centered">
                        <img
                            className="Image__circle"
                            src={props.team?.team_avatar_image}
                            alt=""
                        />
                    </div>
                    <div className="Avatar__sport-accessory Avatar__white-background Avatar__small-border">
                        <BaseballLogo></BaseballLogo>
                    </div>
                </div>
                <div className="TeamInfoSection__teamText">
                    <div className="TeamInfoSection__teamNameContainer"><span className="Text__text Text__left Text__off-black Text__base Text__xbold TeamInfoSection__teamName">{props.team?.name}</span></div>
                    <div className="TeamInfoSection__teamSeasonLocation" data-testid="TeamInfoSection-SeasonRecordAndName">
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__bold">{props.team?.completed_game_scores?.filter((x: GameDataResponse) => x.game_data !== null).filter((x: GameDataResponse) => x.game_data!.team_score > x.game_data!.opponent_score).length}-{props.team?.completed_game_scores?.filter((x: GameDataResponse) => x.game_data !== null).filter((x: GameDataResponse) => x.game_data!.team_score < x.game_data!.opponent_score).length}-{props.team?.completed_game_scores?.filter((x: GameDataResponse) => x.game_data !== null).filter((x: GameDataResponse) => x.game_data!.team_score === x.game_data!.opponent_score).length}</span>
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular"> • {props.team?.season_year}</span>
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular" title={`${props.team?.city}, ${props.team?.state}, ${props.team?.country}`}> • {`${props.team?.city}, ${props.team?.state}, ${props.team?.country}`}</span>
                    </div>
                </div>
            </div>
            <div className="TabNavBar__tabItems">
                <Link to={`/teams/${props.team?.id}/schedule`}>
                    <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Schedule</span></div>
                    {/*<div className="TabNavBarItem__activeTabItemUnderline"></div>*/}
                </Link>
                <Link to={`/teams/${props.team?.id}/teamInfo`}>
                    <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Team</span></div>
                    <div className=""></div>
                </Link>
                <Link to={`/teams/${props.team?.id}/season-stats`}>
                    <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Stats</span></div>
                    <div className=""></div>
                </Link>
            </div>
        </div>
    );
}
export default TeamNavBar;