import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../services/api';
import { Team, Players } from '../models/models';
import './TeamScheduleContainer.scss'
import TeamNavBar from './TeamNavBar';

import './TeamSeasonContainer.scss'
import StandardGrid from './StandardBattingGrid';
import StandardBattingGrid from './StandardBattingGrid';
import AdvancedBattingGrid from './AdvancedBattingGrid';
import { Stats } from 'fs';
import StandardPitchingGrid from './StandardPitchingGrid';
import AdvancedPitchingGrid from './AdvancedPitchingGrid';
import StandardFieldingGrid from './StandardFieldingGrid';


function TeamSeasonContainer() {

    const { id } = useParams();
    const [data, setData] = useState<Team>();

    React.useEffect(() => {
        const services = new Service();
        services.getSeasonStats('teams', id).then(data => {
            setData(data);
         });
    }, []);

    function getGrid() {
        if (data !== undefined) {
            //return <StandardPitchingGrid {...data!}></StandardPitchingGrid>;
            //return <AdvancedPitchingGrid {...data!}></AdvancedPitchingGrid>;
            return <StandardFieldingGrid {...data!}></StandardFieldingGrid>;
            //return <StandardBattingGrid {...data!}></StandardBattingGrid>;
            //return <AdvancedBattingGrid {...data!}></AdvancedBattingGrid>;
        }
        return "";
    }
    
    return (

        <main className="MainContent__mainContentContainer">
            <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                <TeamNavBar {...data!} />
            </div>
            { getGrid() }
        </main>

    );
}

export default TeamSeasonContainer;