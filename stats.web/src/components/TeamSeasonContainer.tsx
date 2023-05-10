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
import StandardCatchingGrid from './StandardCatchingGrid';
import SeasonStatsTopGrid from "./SeasonStatsTopGrid";


function TeamSeasonContainer() {

    const { id } = useParams();
    const [data, setData] = useState<Team>();
    const [grid, setGrid] = useState("Batting");
    const [gridType, setGridType] = useState("Standard");

    React.useEffect(() => {
        const services = new Service();
        services.getSeasonStats('teams', id).then(data => {
            setData(data);
        });
    }, []);

    function getGrid() {
        if (data !== undefined) {
            if (grid === "Batting" && gridType === "Advnaced") {
                return <AdvancedBattingGrid {...data!}></AdvancedBattingGrid>;
            } else if (grid === "Pitching" && gridType === "Standard") {
                return <StandardPitchingGrid {...data!}></StandardPitchingGrid>;
            }
            else if (grid === "Pitching" && gridType === "Advanced") {
                return <AdvancedPitchingGrid {...data!}></AdvancedPitchingGrid>;
            }
            else if (grid === "Fielding" && gridType === "Standard") {
                return <StandardFieldingGrid {...data!}></StandardFieldingGrid>;
            }
            else if (grid === "Fielding" && gridType === "Catching") {
                return <StandardCatchingGrid {...data!}></StandardCatchingGrid>;
            }
            else {
                return <StandardBattingGrid {...data!}></StandardBattingGrid>;
            }
        }
        return "";
    }

    return (

        <main className="MainContent__mainContentContainer">
            <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                <TeamNavBar {...data!} />
            </div>
            <div className="OldGrid__grid OldGrid__centered SeasonStatsPage__statsPageContainer">

                <SeasonStatsTopGrid setGrid={setGrid} setGridType={setGridType} grid={grid} gridType={gridType} />

                <div className="Spacer__spacer Spacer__md Spacer__vertical" />

                {getGrid()}
            </div>
        </main>

    );
}

export default TeamSeasonContainer;