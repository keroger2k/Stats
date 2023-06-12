import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import Service from '../../services/api';
import { Team, Event, GameData, Players, Player, TeamEventData } from '../../models/models';
import { EventDetails } from "./EventDetails";
import StandardBattingGrid from '../StatGrids/StandardBattingGrid';
import AdvancedBattingGrid from '../StatGrids/AdvancedBattingGrid';
import StandardPitchingGrid from '../StatGrids/StandardPitchingGrid';
import AdvancedPitchingGrid from '../StatGrids/AdvancedPitchingGrid';
import StandardFieldingGrid from '../StatGrids/StandardFieldingGrid';
import StandardCatchingGrid from '../StatGrids/StandardCatchingGrid';
import SeasonStatsTopGrid from "../StatGrids/StatsTopGrid";


function EventPage() {
    const { id, eventID } = useParams();
    const [team, setTeam] = useState<Team>();
    const [event, setEvent] = useState<Event>();
    const [teamEvent, setTeamEvent] = useState<TeamEventData>();
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [grid, setGrid] = useState("Batting");
    const [gridType, setGridType] = useState("Standard");

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

    function getTeamPlayerStats(players: Player[], playerStats: Players, filtered: Players) {


        players.map((player: Player) => {
            if (playerStats[player.id]) {
                filtered[player.id] = playerStats[player.id]
            }
        });

        return filtered;
    }

    function getGrid() {
        if (teamEvent !== undefined && team !== undefined) {
            if (grid === "Batting" && gridType === "Advanced") {
                return <AdvancedBattingGrid player_names={team.players} player_stats={getTeamPlayerStats(team.players, teamEvent.player_stats.players, {})} summary={teamEvent.player_stats.stats}></AdvancedBattingGrid>;
            } else if (grid === "Pitching" && gridType === "Standard") {
                return <StandardPitchingGrid player_names={team.players} player_stats={getTeamPlayerStats(team.players, teamEvent.player_stats.players, {})} summary={teamEvent.player_stats.stats}></StandardPitchingGrid>;
            }
            else if (grid === "Pitching" && gridType === "Advanced") {
                return <AdvancedPitchingGrid player_names={team.players} player_stats={getTeamPlayerStats(team.players, teamEvent.player_stats.players, {})} summary={teamEvent.player_stats.stats}></AdvancedPitchingGrid>;
            }
            else if (grid === "Fielding" && gridType === "Standard") {
                return <StandardFieldingGrid player_names={team.players} player_stats={getTeamPlayerStats(team.players, teamEvent.player_stats.players, {})} summary={teamEvent.player_stats.stats}></StandardFieldingGrid>;
            }
            else if (grid === "Fielding" && gridType === "Catching") {
                return <StandardCatchingGrid player_names={team.players} player_stats={getTeamPlayerStats(team.players, teamEvent.player_stats.players, {})} summary={teamEvent.player_stats.stats}></StandardCatchingGrid>;
            }
            else {
                return <StandardBattingGrid player_names={team.players} player_stats={getTeamPlayerStats(team.players, teamEvent.player_stats.players, {})} summary={teamEvent.player_stats.stats}></StandardBattingGrid>;
            }
        }
        return "";
    }

    if (teamEvent !== undefined && team !== undefined) {
        return (
            <>
                <EventDetails event={event!} team={team} gameData={gameData!} />
                <div className="OldGrid__grid OldGrid__centered SeasonStatsPage__statsPageContainer">
                    <div data-testid="stats-view-chooser" className="TabViewChooser__container GameStatsDisplay__teamTabContainer">
                        <span className="Clickable__container" role="button" data-testid="ourTeamTab">
                            <div className="TabViewChooserItem__tabViewChooserItem TabViewChooserItem__activeTabViewChooserItem" role="tab">
                                <span className="Text__text Text__left Text__gc-blue Text__small Text__semibold TabViewChooserItem__tabViewChooserLabel TabViewChooserItem__tabViewChooserLabelNoWrap">{team.name}</span>
                            </div>
                        </span>
                        <span className="Clickable__container" role="button" data-testid="opponentTeamTab">
                            <div className="TabViewChooserItem__tabViewChooserItem" role="tab">
                                <span className="Text__text Text__left Text__off-black Text__small Text__semibold TabViewChooserItem__tabViewChooserLabel TabViewChooserItem__tabViewChooserLabelNoWrap">{event?.pregame_data?.opponent_name}</span>
                            </div>
                        </span>
                    </div>
                    <SeasonStatsTopGrid setGrid={setGrid} setGridType={setGridType} grid={grid} gridType={gridType} />
                    <div className="Spacer__spacer Spacer__md Spacer__vertical" />
                    {getGrid()}
                </div>
            </>
        );
    }
    return (
        <h1> </h1>
    );
}

export default EventPage;