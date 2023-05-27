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
                        <img src={`${process.env.REACT_APP_API_URL}/teams/${team.id}/avatar`} alt="" className="Image__circle" />
                    </div>
                    <div className="Avatar__sport-accessory Avatar__white-background Avatar__small-border"><svg width="24" height="24" viewBox="0 0 24 24" data-testid="icon-baseball" xmlns="http://www.w3.org/2000/svg"><g id="Baseball" fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><g fill-rule="nonzero"><path d="M19.778 19.778c4.296-4.296 4.296-11.26 0-15.556-4.296-4.296-11.26-4.296-15.556 0-4.296 4.296-4.296 11.26 0 15.556 4.296 4.296 11.26 4.296 15.556 0zM5.636 18.364a9 9 0 1 1 .21.203l-.21-.203z" fill="#0A0B0D"></path><path d="M22.644 12.68A8.038 8.038 0 0 1 11.32 1.355l1.53 1.29a6.038 6.038 0 0 0 8.505 8.506l1.29 1.53zM9.565 21.504a9.209 9.209 0 0 0-2.5-4.57 9.209 9.209 0 0 0-4.57-2.5l.425-1.953a11.209 11.209 0 0 1 5.56 3.04 11.209 11.209 0 0 1 3.04 5.559l-1.955.424z" fill="#FF4054"></path><path d="M19.778 19.778c4.296-4.296 4.296-11.26 0-15.556-4.296-4.296-11.26-4.296-15.556 0-4.296 4.296-4.296 11.26 0 15.556 4.296 4.296 11.26 4.296 15.556 0zM5.636 18.364a9 9 0 1 1 .21.203l-.21-.203z" fill="#0A0B0D"></path></g></g></svg></div>
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