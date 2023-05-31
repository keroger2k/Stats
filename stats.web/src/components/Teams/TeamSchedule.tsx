import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../../services/api';
import { Link } from 'react-router-dom';
import { Team, formatWeekdayShort, formatMonthShort } from '../../models/models';
import Chevron from '../SVGImages/Chevron';
import TeamEvent from './TeamEvent';
import TeamNavBar from '../TeamNavBar/TeamNavBar';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import './TeamSchedule.scss'

function TeamSchedule() {

    const { id } = useParams();
    const [data, setData] = useState<Team | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    function getDay(date: string | undefined) {
        var d = new Date(date!);
        return d.getDay();
    }
    function getMonth(date: string | undefined) {
        var d = new Date(date!);
        return d.getMonth();
    }

    function getId() { return id; }

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

    function getProgenId(id: string | null | undefined) {
        var team = data?.opponents?.filter((item) => item.root_team_id === id)[0];
        return team === undefined ? null : team?.progenitor_team_id;
    }


    function importTeam(id: string | undefined) {
        const services = new Service();
        setIsLoading(true)
        services.importTeam('Teams', id).then(() => {
            //window.location.reload();
            setIsLoading(false)
        });
    }

    React.useEffect(() => {
        const services = new Service();
        setIsLoading(true)
        services.getSchedule('teams', id).then((data: Team) => {
            setData(data);
            setIsLoading(false)
        });
    }, []);

    const content = data?.schedule?.map((teamEvent) => {
        if (teamEvent.pregame_data && getProgenId(teamEvent.pregame_data?.opponent_id) !== null) {
            return (
                <>
                    <span key={teamEvent.event.id}>
                        <div className="opponent_link">
                            <Link target="_top" rel="noopener noreferrer" to={`/teams/${getProgenId(teamEvent.pregame_data?.opponent_id)}/schedule`} ><button className="btn btn-primary btn-sm">Opponent Page</button></Link>
                        </div>
                        <Link to={`/teams/${data.id}/schedule/${teamEvent.event.id}`} key={teamEvent.event.id}>
                            <div className="ScheduleListByMonth__dayRow">
                                <div className="ScheduleListByMonth__dayDate">
                                    <div className="Text__text Text__center Text__cool-grey-dark Text__small Text__regular">{formatMonthShort(getMonth(teamEvent.event.start?.datetime))}</div>
                                    <div className="Text__text Text__center Text__off-black Text__base Text__xbold ScheduleListByMonth__dateText">{getDate(teamEvent.event.start?.datetime)}</div>
                                </div>
                                <div>
                                    <span className="ScheduleListByMonth__event">
                                        <div className="ScheduleListByMonth__title">
                                            <div className="ScheduleListByMonth__eventIndicators"></div>
                                            <div className="Text__text Text__left Text__off-black Text__base Text__semibold">{teamEvent.event.title}</div>
                                        </div>
                                        <div className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular ScheduleListByMonth__location">at {teamEvent.event.location?.address === null ? "" : teamEvent.event.location?.address[0]}</div>
                                        <div className="ScheduleListByMonth__scoreOrTime">
                                            <TeamEvent isGame={teamEvent.event.event_type === "game"} time={getTime(teamEvent.event.start?.datetime)} score={getScore(teamEvent.event.id)}></TeamEvent>
                                            <span className="ScheduleListByMonth__chevron">
                                                <Chevron></Chevron>
                                            </span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </Link></span>
                </>
            );
        } else if (teamEvent.event.event_type === "game") {
            return (
                <>
                    <span key={teamEvent.event.id}>
                        <Link to={`/teams/${data.id}/schedule/${teamEvent.event.id}`} key={teamEvent.event.id}>
                            <div className="ScheduleListByMonth__dayRow">
                                <div className="ScheduleListByMonth__dayDate">
                                    <div className="Text__text Text__center Text__cool-grey-dark Text__small Text__regular">{formatMonthShort(getMonth(teamEvent.event.start?.datetime))}</div>
                                    <div className="Text__text Text__center Text__off-black Text__base Text__xbold ScheduleListByMonth__dateText">{getDate(teamEvent.event.start?.datetime)}</div>
                                </div>
                                <div>
                                    <span className="ScheduleListByMonth__event">
                                        <div className="ScheduleListByMonth__title">
                                            <div className="ScheduleListByMonth__eventIndicators"></div>
                                            <div className="Text__text Text__left Text__off-black Text__base Text__semibold">{teamEvent.event.title}</div>
                                        </div>
                                        <div className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular ScheduleListByMonth__location">at {teamEvent.event.location?.address === null ? "" : teamEvent.event.location?.address[0]}</div>
                                        <div className="ScheduleListByMonth__scoreOrTime">
                                            <TeamEvent isGame={teamEvent.event.event_type === "game"} time={getTime(teamEvent.event.start?.datetime)} score={getScore(teamEvent.event.id)}></TeamEvent>
                                            <span className="ScheduleListByMonth__chevron">
                                                <Chevron></Chevron>
                                            </span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </Link></span>
                </>
            );
        }
    });


    return (
        <main className="MainContent__mainContentContainer">
            <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                <TeamNavBar {...data!} />
            </div>
            <div className="Grid__grid Grid__fixed ScheduleListContainer__schedulePageContainer">
                <div className="Grid__grid-item ScheduleListContainer__scheduleHeader" >
                    <div className="OldGrid__row OldGrid__vertical-align Title__row ScheduleListContainer__scheduleHeaderRow" role="presentation">
                        <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header">Game Schedule</h1>
                    </div>
                </div>
                <br />
                <div className="Grid__grid-item" >
                    <div className="Grid__grid-item" >
                        <div className="ScheduleSection__section ScheduleListByMonth__eventMonth">
                            {isLoading ? <LoadingSpinner /> : content}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default TeamSchedule;