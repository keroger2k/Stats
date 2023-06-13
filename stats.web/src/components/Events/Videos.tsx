import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import Service from '../../services/api';
import { Link } from 'react-router-dom';
import { Team, Event, GameData, TeamEventData, VideoAsset } from '../../models/models';
import { EventDetails } from "./EventDetails";
import VideoJS from '../VideoJS'



function Videos() {
    const { id, eventID } = useParams();
    const [team, setTeam] = useState<Team>();
    const [event, setEvent] = useState<Event>();
    const [teamEvent, setTeamEvent] = useState<TeamEventData>();
    const [gameData, setGameData] = useState<GameData>();

    React.useEffect(() => {
        const services = new Service();
        services.getSchedule('teams', id).then((team: Team) => {
            setTeam(team);
            setEvent(team.schedule?.filter((item) => item.event.id === eventID)[0]!);
            setGameData(team.completed_game_scores?.filter((item) => item.event_id === eventID)[0]?.game_data!);
        });

        services.getEvent('teams', id, eventID).then((teamEvent: TeamEventData) => {
            setTeamEvent(teamEvent);
        });

    }, []);


    const content = team?.video_assets.filter((video: VideoAsset) => video.schedule_event_id === eventID).map((video: VideoAsset) => {
        const videoJsOptions = {
            controls: true,
            poster: video.thumbnail_url,
            sources: [{
                src: `${process.env.REACT_APP_API_URL}/Teams/${team?.id}/schedule/${eventID}/videos/${video.id}/playlist.m3u8`,
                type: 'application/x-mpegURL',

            }]
        };

        const handlePlayerReady = () => {

        };


        return (
            <>
                <div className="Grid__grid Grid__fixed VideoArchiveDisplay__videoArchiveContainer">
                    <div className="Grid__grid-item" >
                        <div data-testid="primaryVideoContainer">
                            <div className="PrimaryVideo__primaryVideo">
                                <div data-testid="video-wrapper">
                                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                                </div>
                            </div>
                            <div className="PrimaryVideo__details">
                                <div className="Text__text Text__left Text__off-black Text__large Text__bold PrimaryVideo__title">{event?.pregame_data?.opponent_name}</div>
                                <div className="Text__text Text__left Text__off-black Text__base Text__regular PrimaryVideo__subtitle">{event?.event.start?.datetime }</div>
                                <span className="PrimaryVideo__deleteBtnContainer">
                                    <span className="ConfirmationPopup__button-container">
                                        <div className="Popover__popoverContent"></div>
                                        <div>

                                        </div>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    });

    if (team !== undefined) {
        return (
            <>
                <EventDetails event={event!} team={team} gameData={gameData!} />
                <div className="EventNavBar__eventNavBar" data-testid="event-navbar">
                    <div className="TabNavBar__tabItems">
                        <Link to={`/teams/${team.id}/schedule/${eventID}`} key={eventID}>
                            <a data-testid="event-nav-bar-game-stats" href="">
                                <div className="TabNavBarItem__tabNavBarItem " role="tab"><span className="Text__text Text__left Text__gc-blue Text__base Text__bold TabNavBarItem__tabNavBarLabel">Game Stats</span></div>
                                <div className=""></div>
                            </a>
                        </Link>
                        <Link to={`/teams/${team.id}/schedule/${eventID}/videos`} key={eventID}>
                            <a data-testid="event-nav-bar-video-archive" href="">
                                <div className="TabNavBarItem__tabNavBarItem TabNavBarItem__activeTabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Videos</span></div>
                                <div className="TabNavBarItem__activeTabItemUnderline"></div>
                            </a>
                        </Link>
                    </div>
                </div>
                <br />
                {content}
            </>
        );
    } else {
        return (
            <h1>&nbsp;</h1>
        );

    }
}

export default Videos;