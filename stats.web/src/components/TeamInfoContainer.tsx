﻿import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../services/api';
import { Team } from '../models/models';
import './TeamScheduleContainer.scss'



function TeamInfoContainer() {

    const { id } = useParams();
    const [data, setData] = useState<Team | null>(null);

    React.useEffect(() => {
        const services = new Service();
        services.getSchedule('teams', id).then(data => {
            setData(data);
        });
    }, []);

    


    return (

        <h1>Team Info</h1>

    );
}

export default TeamInfoContainer;