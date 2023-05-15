import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import Service from '../../services/api';
import { Team, Event, GameData, VideoClip } from '../../models/models';
import { EventDetails } from "./EventDetails";
import { VideoArchivePage } from "./VideoArchivePage";

function EventPage() {
    const { id, eventID } = useParams();
    const [team, setTeam] = useState<Team | null>(null);
    const [event, setEvent] = useState<Event | null>(null);
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [videos, setVideos] = useState<VideoClip[] | null>(null);

    React.useEffect(() => {
        const services = new Service();
        services.getSchedule('teams', id).then((team: Team) => {
            setTeam(team);
            setEvent(team.schedule?.filter((item) => item.event.id === eventID)[0]!);
            setGameData(team.completed_game_scores?.filter((item) => item.event_id === eventID)[0]?.game_data!);
        });

        services.getEventVideos('teams', id, eventID).then((videos: VideoClip[]) => {
            setVideos(videos);
        });
    }, []);

    if (team !== null) {
        return (
            <>
                <EventDetails event={event!} team={team} gameData={gameData!} />
                <VideoArchivePage videos={videos!} />
            </>
        );
    }
    return (
        <h1> </h1>
    );
}

export default EventPage;