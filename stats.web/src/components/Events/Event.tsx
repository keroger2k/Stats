import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import Service from '../../services/api';
import { Team, Event, GameData } from '../../models/models';
import { EventDetails } from "./EventDetails";

function EventPage() {
    const { id, eventID } = useParams();
    const [team, setTeam] = useState<Team | null>(null);
    const [event, setEvent] = useState<Event | null>(null);
    const [gameData, setGameData] = useState<GameData | null>(null);

    React.useEffect(() => {
        const services = new Service();
        services.getSchedule('teams', id).then((team: Team) => {
            setTeam(team);
            setEvent(team.schedule?.filter((item) => item.event.id === eventID)[0]!);
            setGameData(team.completed_game_scores?.filter((item) => item.event_id === eventID)[0]?.game_data!);
        });
    }, []);

    if (team !== null) {
        return (
            <EventDetails event={event!} team={team} gameData={gameData!} />
        );
    }
    return (
        <h1> </h1>
    );
}

export default EventPage;