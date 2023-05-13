import BaseballLogoLarge from "../SVGImages/BaseballLogoLarge";
import { GameDataResponse, Team } from "../../models/models";
import TabNavBar from "../TabNavBar/TabNavBar";

import './TeamNavBar.scss'

function TeamNavBar(team: Team) {
    return (
        <div className="TeamNavBar__navBar">
            <div className="TeamInfoSection__teamInfo" data-testid="TeamInfoSection">
                <div className="Avatar__container Avatar__white-background Avatar__large TeamInfoSection__teamAvatar TeamInfoSection__teamCustomAvatar">
                    <div className="Avatar__centered">
                        <BaseballLogoLarge></BaseballLogoLarge>
                    </div>
                </div>
                <div className="TeamInfoSection__teamText">
                    <div className="TeamInfoSection__teamNameContainer"><span className="Text__text Text__left Text__off-black Text__base Text__xbold TeamInfoSection__teamName">{team?.name}</span></div>
                    <div className="TeamInfoSection__teamSeasonLocation" data-testid="TeamInfoSection-SeasonRecordAndName">
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__bold">{team?.completed_game_scores?.filter((x: GameDataResponse) => x.game_data !== null).filter((x: GameDataResponse) => x.game_data!.team_score > x.game_data!.opponent_score).length}-{team?.completed_game_scores?.filter((x: GameDataResponse) => x.game_data !== null).filter((x: GameDataResponse) => x.game_data!.team_score < x.game_data!.opponent_score).length}-{team?.completed_game_scores?.filter((x: GameDataResponse) => x.game_data !== null).filter((x: GameDataResponse) => x.game_data!.team_score === x.game_data!.opponent_score).length}</span>
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular"> - {team?.season_year}</span>
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular" title={`${team?.city}, ${team?.state}, ${team?.country}`}> - {`${team?.city}, ${team?.state}, ${team?.country}`}</span>
                    </div>
                </div>
            </div>
            <TabNavBar {...team} />
        </div>
    );
}
export default TeamNavBar;