import { } from "react-bootstrap";
import { Team, Player } from "../models/models";
import SeasonStatsTopGrid from "./SeasonStatsTopGrid";

function AdvancedPitchingGrid(team: Team) {

    function getPlayer(id: string) {
        return team.players.find((player: Player) => player.id === id);
    }

    const content = Object.keys(team.season_stats.stats_data.players).map<any>((player) => {
        return (
            <tr className="whiteRow odd">
                <td className="playerNameCell invertLinkUnderline strong">{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.ip.toFixed(1)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.bf}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["P/IP"].toFixed(1)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["P/BF"].toFixed(3)}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.defense["<3%"] * 100).toFixed(2)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.LOO}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["1ST2OUT"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["123INN"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["<13"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.FIP}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.defense["S%"] * 100).toFixed(2)}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.defense["FPS%"] * 100).toFixed(2)}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.defense["FPSO%"] * 100).toFixed(2)}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.defense["FPSW%"] * 100).toFixed(2)}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.defense["FPSH%"] * 100).toFixed(2)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["BB/INN"].toFixed(3).replace(/^0+/, '')}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.BBS}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.LOBB}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.LOBBS}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["SM%"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["K/BF"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["K/BB"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["WEAK%"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["HHB%"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["GO/AO"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.HR}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["LD%"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["FB%"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["GB%"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.BABIP}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["BA/RISP"]}</td>
            </tr>);
    });


    return (
        <div className="OldGrid__grid OldGrid__centered SeasonStatsPage__statsPageContainer">

            <SeasonStatsTopGrid></SeasonStatsTopGrid>


            <div className="Spacer__spacer Spacer__md Spacer__vertical" />

            <div id="stats_container">
                <div className="statsPageContainer grid">
                    <table className="gcTable statTable withGridLines withOutline withHoverHighlighting">
                        <thead>
                            <tr>
                                <th className="playerNameCell invertLinkUnderline strong header headerSortDown">Player</th>
                                <th className="statCell header">IP</th>
                                <th className="statCell header">BF</th>
                                <th className="statCell header">P/IP</th>
                                <th className="statCell header">P/BF</th>
                                <th className="statCell header">3%</th>
                                <th className="statCell header">LOO</th>
                                <th className="statCell header">1ST2OUT/K</th>
                                <th className="statCell header">123INN</th>
                                <th className="statCell header">13</th>
                                <th className="statCell header">FIP</th>
                                <th className="statCell header">S%</th>
                                <th className="statCell header">FPS%</th>
                                <th className="statCell header">FPSO%</th>
                                <th className="statCell header">FPSW%</th>
                                <th className="statCell header">FPSH%</th>
                                <th className="statCell header">BB/INN</th>
                                <th className="statCell header">OBBINN</th>
                                <th className="statCell header">BBS</th>
                                <th className="statCell header">LOBB</th>
                                <th className="statCell header">LOBBS</th>
                                <th className="statCell header">SM%</th>
                                <th className="statCell header">K/BF</th>
                                <th className="statCell header">K/BB</th>
                                <th className="statCell header">WEAK%</th>
                                <th className="statCell header">HHB%</th>
                                <th className="statCell header">GO/AO</th>
                                <th className="statCell header">HR</th>
                                <th className="statCell header">LD%</th>
                                <th className="statCell header">FB%</th>
                                <th className="statCell header">GB%</th>
                                <th className="statCell header">BABIP</th>
                                <th className="statCell header">BARISP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="footerTitleCell">Team</td>
                                <td className="statCell">{ team.season_stats.stats_data.stats.defense.ip.toFixed(1)}</td>
                                <td className="statCell">{ team.season_stats.stats_data.stats.defense.bf}</td>
                                <td className="statCell">{ team.season_stats.stats_data.stats.defense["P/IP"].toFixed(1)}</td>
                                <td className="statCell">{ team.season_stats.stats_data.stats.defense["P/BF"].toFixed(3)}</td>
                                <td className="statCell">{ (team.season_stats.stats_data.stats.defense["<3%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.LOO}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["1ST2OUT"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["123INN"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["<13"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.FIP}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.defense["S%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.defense["FPS%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.defense["FPSO%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.defense["FPSW%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.defense["FPSH%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["BB/INN"].toFixed(3).replace(/^0+/, '')}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.BBS}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.LOBB}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.LOBBS}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["SM%"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["K/BF"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["K/BB"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["WEAK%"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["HHB%"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["GO/AO"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.HR}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["LD%"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["FB%"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["GB%"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.BABIP}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["BA/RISP"]}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="Spacer__spacer Spacer__md Spacer__vertical" />

            <div className="StatsLegend__legendRow" data-testid="stats-legend">
                <dl>
                    <dt>IP</dt>
                    <dd>Innings pitched</dd>
                    <dt>BF</dt>
                    <dd>Total batters faced</dd>
                    <dt>P/IP</dt>
                    <dd>Pitches per inning</dd>
                    <dt>P/BF</dt>
                    <dd>Pitches per batter faced</dd>
                    <dt>&lt;3%</dt>
                    <dd>% of batters on or out in three pitches or less</dd>
                    <dt>LOO</dt>
                    <dd>Leadoff out (1st batter of inning)</dd>
                    <dt>1ST2OUT</dt>
                    <dd>Innings with 1st 2 batters out</dd>
                    <dt>123INN</dt>
                    <dd>1-2-3 Innings</dd>
                    <dt>&lt;13</dt>
                    <dd>Innings of 13 pitches or fewer</dd>
                    <dt>FIP</dt>
                    <dd>Fielding Independent Pitching</dd>
                    <dt>S%</dt>
                    <dd>Strike percentage</dd>
                    <dt>FPS%</dt>
                    <dd>First pitch strike percentage</dd>
                    <dt>FPSO%</dt>
                    <dd>% of FPS at-bats that result in an out</dd>
                    <dt>FPSW%</dt>
                    <dd>% of FPS at-bats that result in a walk</dd>
                    <dt>FPSH%</dt>
                    <dd>% of FPS at-bats that result in a hit</dd>
                    <dt>BB/INN</dt>
                    <dd>Walks per inning</dd>
                </dl>
                <dl>
                    <dt>0BBINN</dt>
                    <dd>Zero-walk innings</dd>
                    <dt>BBS</dt>
                    <dd>Walks that score</dd>
                    <dt>LOBB</dt>
                    <dd>Leadoff walk (1st batter of inning)</dd>
                    <dt>LOBBS</dt>
                    <dd>Leadoff walk that scored (1st batter of inning)</dd>
                    <dt>SM%</dt>
                    <dd>% of total pitches that are swings and misses</dd>
                    <dt>K/BF</dt>
                    <dd>Strikeouts per batter faced</dd>
                    <dt>K/BB</dt>
                    <dd>Strikeouts per walk</dd>
                    <dt>WEAK%</dt>
                    <dd>% of batted balls weakly hit (fly balls and ground balls)</dd>
                    <dt>HHB%</dt>
                    <dd>% of batted balls that are line drives or hard ground balls</dd>
                    <dt>GO/AO</dt>
                    <dd>Ratio of ground outs to air outs</dd>
                    <dt>HR</dt>
                    <dd>Home runs allowed</dd>
                    <dt>LD%</dt>
                    <dd>Line drive percentage</dd>
                    <dt>FB%</dt>
                    <dd>Fly ball percentage</dd>
                    <dt>GB%</dt>
                    <dd>% of all batted balls hit on the ground</dd>
                    <dt>BABIP</dt>
                    <dd>Opponent batting average on balls in play</dd>
                    <dt>BA/RISP</dt>
                    <dd>Opponent batting average with runners in scoring position</dd>
                </dl>
            </div>

        </div>
    );

}

export default AdvancedPitchingGrid;