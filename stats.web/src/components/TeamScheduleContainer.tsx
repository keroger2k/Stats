import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../services/api';
import { Link } from 'react-router-dom';
import { Team, formatWeekdayShort, GameDataResponse } from '../models/models';
import BaseballLogo from './BaseballLogo';
import Chevron from './Chevron';
import './TeamScheduleContainer.scss'
import TeamEvent from './TeamEvent';

class TeamRecord {
    wins: number = 0;
    losses: number = 0;
    ties: number = 0;
}


function TeamScheduleContainer() {

    const { id } = useParams();
    const [data, setData] = useState<Team | null>(null);


    function getDay(date: string | undefined) {
        var d = new Date(date!);
        return d.getDay();
    }

    function getDate(date: string | undefined) {
        var d = new Date(date!);
        return d.getDate();
    }

    function getTime(date: string | undefined) {
        var d = new Date(date!);
        var hours = (d.getHours() + 24) % 12 || 12;
        var ampm = d.getHours() >= 12 ? 'PM' : 'AM';
        var minutes = "0" + d.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2) + " " + ampm;
        return formattedTime;
    }

    function getScore(id: any) {
        return data?.completed_game_scores?.filter((teamEvent) => teamEvent.event_id === id);
    }

    React.useEffect(() => {
        const services = new Service();
        services.getSchedule('teams', id).then(data => {
            
            setData(data);

        });
    }, []);

    const content = data?.schedule?.map((teamEvent) =>
        <Link to={`/teams/${data.id}/schedule/events/${teamEvent.event.id}`}>
            <div className="ScheduleListByMonth__dayRow">
                <div className="ScheduleListByMonth__dayDate">
                    <div className="Text__text Text__center Text__cool-grey-dark Text__small Text__regular">{ formatWeekdayShort(getDay(teamEvent.event.start?.datetime)) }</div>
                    <div className="Text__text Text__center Text__off-black Text__base Text__xbold ScheduleListByMonth__dateText">{getDate(teamEvent.event.start?.datetime)}</div>
                </div>
                <div>
                    <a className="ScheduleListByMonth__event" href="#">
                        <div className="ScheduleListByMonth__title">
                            <div className="ScheduleListByMonth__eventIndicators"></div>
                            <div className="Text__text Text__left Text__off-black Text__base Text__semibold">{teamEvent.event.title}</div>
                        </div>
                        <div className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular ScheduleListByMonth__location">at {teamEvent.event.location?.address[0]}</div>
                        <div className="ScheduleListByMonth__scoreOrTime">
                            <TeamEvent isGame={teamEvent.event.event_type === "game"} time={getTime(teamEvent.event.start?.datetime)} score={getScore(teamEvent.event.id)}></TeamEvent>
                            <span className="ScheduleListByMonth__chevron">
                                <Chevron></Chevron>
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </Link>
    );


    return (
        <main className="MainContent__mainContentContainer">
            <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                <div className="TeamNavBar__navBar">
                    <div className="TeamInfoSection__teamInfo" data-testid="TeamInfoSection">
                        <div className="Avatar__container Avatar__white-background Avatar__large TeamInfoSection__teamAvatar TeamInfoSection__teamCustomAvatar">
                            <div className="Avatar__centered">
                                <img
                                    className="Image__circle"
                                    src={data?.team_avatar_image}
                                    alt=""
                                />
                            </div>
                            <div className="Avatar__sport-accessory Avatar__white-background Avatar__small-border">
                                <BaseballLogo></BaseballLogo>
                            </div>
                        </div>
                        <div className="TeamInfoSection__teamText">
                            <div className="TeamInfoSection__teamNameContainer"><span className="Text__text Text__left Text__off-black Text__base Text__xbold TeamInfoSection__teamName">{data?.name}</span></div>
                            <div className="TeamInfoSection__teamSeasonLocation" data-testid="TeamInfoSection-SeasonRecordAndName">
                                <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__bold">{data?.completed_game_scores?.filter((x: GameDataResponse) => x.game_data !== null).filter((x: GameDataResponse) => x.game_data!.team_score > x.game_data!.opponent_score).length}-{data?.completed_game_scores?.filter((x: GameDataResponse) => x.game_data !== null).filter((x: GameDataResponse) => x.game_data!.team_score < x.game_data!.opponent_score).length}-{data?.completed_game_scores?.filter((x: GameDataResponse) => x.game_data !== null).filter((x: GameDataResponse) => x.game_data!.team_score === x.game_data!.opponent_score).length}</span>
                                <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular"> • {data?.season_year}</span>
                                <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular" title={`${data?.city}, ${data?.state}, ${data?.country}`}> • {`${data?.city}, ${data?.state}, ${data?.country}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="TabNavBar__tabItems">
                        <a data-testid="team-nav-bar-schedule" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/schedule">
                            <div className="TabNavBarItem__tabNavBarItem TabNavBarItem__activeTabNavBarItem" role="tab"><span className="Text__text Text__left Text__gc-blue Text__base Text__bold TabNavBarItem__tabNavBarLabel">Schedule</span></div>
                            <div className="TabNavBarItem__activeTabItemUnderline"></div>
                        </a>
                        <a data-testid="team-nav-bar-team" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/teamInfo">
                            <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Team</span></div>
                            <div className=""></div>
                        </a>
                        <a data-testid="team-nav-bar-stats" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/season-stats">
                            <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Stats</span></div>
                            <div className=""></div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="Grid__grid Grid__fixed ScheduleListContainer__schedulePageContainer">
                <div className="Grid__grid-item ScheduleListContainer__scheduleHeader" >
                    <div className="OldGrid__row OldGrid__vertical-align Title__row ScheduleListContainer__scheduleHeaderRow" role="presentation">
                        <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header">Schedule</h1>
                        <button type="button" className="Button__large Button__gc-blue Button__filled Button__fixed" data-testid="add-event-button">
                            <span className="Text__text Text__left Text__white Text__base Text__bold">Update Team Data</span>
                        </button>
                    </div>
                </div>
                <br/>
                <div className="Grid__grid-item" >
                    <div className="Grid__grid-item" >
                        <div className="ScheduleSection__section ScheduleListByMonth__eventMonth">
                           {content} 
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default TeamScheduleContainer;