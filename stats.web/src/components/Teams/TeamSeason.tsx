import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../../services/api';
import { Team } from '../../models/models';
import './TeamSeason.scss'
import TeamNavBar from '../TeamNavBar/TeamNavBar';
import StandardBattingGrid from '../StatGrids/StandardBattingGrid';
import AdvancedBattingGrid from '../StatGrids/AdvancedBattingGrid';
import StandardPitchingGrid from '../StatGrids/StandardPitchingGrid';
import AdvancedPitchingGrid from '../StatGrids/AdvancedPitchingGrid';
import StandardFieldingGrid from '../StatGrids/StandardFieldingGrid';
import StandardCatchingGrid from '../StatGrids/StandardCatchingGrid';
import SeasonStatsTopGrid from "../StatGrids/StatsTopGrid";


function TeamSeason() {

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
            if (grid === "Batting" && gridType === "Advanced") {
                return <AdvancedBattingGrid player_names={data.players} player_stats={data.season_stats.stats_data.players} summary={data.season_stats.stats_data.stats}></AdvancedBattingGrid>;
            } else if (grid === "Pitching" && gridType === "Standard") {
                return <StandardPitchingGrid player_names={data.players} player_stats={data.season_stats.stats_data.players} summary={data.season_stats.stats_data.stats}></StandardPitchingGrid>;
            }
            else if (grid === "Pitching" && gridType === "Advanced") {
                return <AdvancedPitchingGrid player_names={data.players} player_stats={data.season_stats.stats_data.players} summary={data.season_stats.stats_data.stats}></AdvancedPitchingGrid>;
            }
            else if (grid === "Fielding" && gridType === "Standard") {
                return <StandardFieldingGrid player_names={data.players} player_stats={data.season_stats.stats_data.players} summary={data.season_stats.stats_data.stats}></StandardFieldingGrid>;
            }
            else if (grid === "Fielding" && gridType === "Catching") {
                return <StandardCatchingGrid player_names={data.players} player_stats={data.season_stats.stats_data.players} summary={data.season_stats.stats_data.stats}></StandardCatchingGrid>;
            }
            else {
                return <StandardBattingGrid player_names={data.players} player_stats={data.season_stats.stats_data.players} summary={data.season_stats.stats_data.stats}></StandardBattingGrid>;
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

export default TeamSeason;