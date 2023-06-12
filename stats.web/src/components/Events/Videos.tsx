import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import Service from '../../services/api';
import { Team, Event, GameData, TeamEventData, Video, VideoAsset } from '../../models/models';
import { EventDetails } from "./EventDetails";


function Videos() {
    const { id, eventID } = useParams();
    const [team, setTeam] = useState<Team>();
    const [event, setEvent] = useState<Event>();
    const [teamEvent, setTeamEvent] = useState<TeamEventData>();
    const [gameData, setGameData] = useState<GameData | null>(null);

    function getUrl(video: Video) {
        var url = `${video.url}?Key-Pair-Id=${video.cookies["CloudFront-Key-Pair-Id"]}&Signature=${video.cookies["CloudFront-Signature"]}&Policy=${video.cookies["CloudFront-Policy"]}`;
        return url;
    }

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


    const content = team?.video_assets.filter((vid: VideoAsset) => vid.schedule_event_id === eventID).map((video) => {
        return (
            <li>
                <br/>
                <img height="180" width="270" alt="" src={video.thumbnail_url} />
            </li>
        );
    });

    if (teamEvent !== undefined && team !== undefined) {
        return (
            <>
                <EventDetails event={event!} team={team} gameData={gameData!} />
                <ul>
                    {content}
                </ul>
            </>
        );
    }
    return (
        <h1> </h1>
    );
}

export default Videos;