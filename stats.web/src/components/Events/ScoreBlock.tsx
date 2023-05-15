import { Team, Event, GameData } from "../../models/models";
import BaseballLogoLarge from "../SVGImages/BaseballLogoLarge";
import Moment from 'moment';

export const ScoreBlock = ({ hide, event, team, gameData }: { hide: boolean; event: Event; team: Team, gameData: GameData }) => {
    if (hide) return <></>;

    function getFormattedDate(startTime: string, endTime: string) {

        var d = new Date(startTime);
        var e = new Date(endTime);

        return (
            <span>{Moment(d).format('ddd MMM DD, h:mm A')} - {Moment(e).format('h:mm A')} </span>
        );
    }

    return (
        <>
            <div className="EventHeaderFinal__eventHeaderGameContainer" data-testid="Event-Header-BatsFinal">
                <div className="EventHeaderFinal__mainContentContainer">
                    <div className="EventHeaderBatsFinal__inlineHeader">
                        <div data-testid="event-time" className="EventTime__inline">
                            <span className="Text__text Text__center Text__white Text__base Text__regular">
                                {getFormattedDate(event.event.start?.datetime!, event.event.end?.datetime!)}
                            </span>
                            <span className="Text__text Text__center Text__off-black Text__base Text__regular">Arrive 2:30 PM</span>
                        </div>
                        <span className="Text__text Text__center Text__off-black Text__base Text__bold FinalText__finalText FinalText__lost">Final</span>
                    </div>
                </div>
                <span className="Text__text Text__center Text__white Text__xxlarge Text__xbold EventHeaderCommon__teamScore EventHeaderFinal__homeScore EventHeaderCommon__homeTeamScore" data-testid="EventHeaderOngoing-homeScore">{gameData.team_score}</span>
                <span className="Text__text Text__center Text__white Text__xxlarge Text__xbold EventHeaderCommon__teamScore EventHeaderFinal__awayScore EventHeaderCommon__awayTeamScore" data-testid="EventHeaderOngoing-awayScore">{gameData.opponent_score}</span>
                <div className="EventHeaderFinal__awayTeamInfo EventHeaderCommon__teamNameAndAvatarContainer EventHeaderCommon__awayTeamNameAndAvatarContainer">
                    <div className="Avatar__container Avatar__white-background Avatar__medium">
                        <div className="Avatar__centered">
                            <BaseballLogoLarge />
                        </div>
                    </div>
                    <span className="Text__text Text__left Text__white Text__medium Text__xbold EventHeaderCommon__teamName" data-testid="away-team-name">{event.pregame_data?.opponent_name}</span>
                </div>
                <div className="EventHeaderFinal__homeTeamInfo EventHeaderCommon__teamNameAndAvatarContainer EventHeaderCommon__homeTeamNameAndAvatarContainer">
                    <div className="Avatar__container Avatar__white-background Avatar__medium">
                        <div className="Avatar__centered">
                            <BaseballLogoLarge />
                        </div>
                    </div>
                    <span className="Text__text Text__left Text__white Text__medium Text__xbold EventHeaderCommon__teamName" data-testid="away-team-name">{team.name}</span>
                </div>
            </div>
        </>
    );
};
