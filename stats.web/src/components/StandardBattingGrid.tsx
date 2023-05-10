import { } from "react-bootstrap";
import { Team, Player } from "../models/models";
import SeasonStatsTopGrid from "./SeasonStatsTopGrid";

function StandardBattingGrid(team: Team) {

    function getPlayer(id: string) {
        return team.players.find((player: Player) => player.id === id);
    }



    const content = Object.keys(team.season_stats.stats_data.players).map<any>((player) => {
        return (
        <tr className="whiteRow odd">
            <td className="playerNameCell invertLinkUnderline strong">{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.general.gp}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.pa}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.ab}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.avg.toFixed(3).replace(/^0+/, '')}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.obp.toFixed(3).replace(/^0+/, '')}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.ops.toFixed(3).replace(/^0+/, '')}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.slg.toFixed(3).replace(/^0+/, '')}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.h}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["1B"]}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["2B"]}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["3B"]}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.hr}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.rbi}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.r}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.bb}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.so}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.sol}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.hbp}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.shb}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.shf}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.roe}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.fc}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.sb}</td>
            <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["SB%"] * 100).toFixed(2) }</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.cs}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.pik}</td>
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
                            <th className="statCell header">GP</th>
                            <th className="statCell header">PA</th>
                            <th className="statCell header">AB</th>
                            <th className="statCell header">AVG</th>
                            <th className="statCell header">OBP</th>
                            <th className="statCell header">OPS</th>
                            <th className="statCell header">SLG</th>
                            <th className="statCell header">H</th>
                            <th className="statCell header">1B</th>
                            <th className="statCell header">2B</th>
                            <th className="statCell header">3B</th>
                            <th className="statCell header">HR</th>
                            <th className="statCell header">RBI</th>
                            <th className="statCell header">R</th>
                            <th className="statCell header">BB</th>
                            <th className="statCell header">SO</th>
                            <th className="statCell header">K-L</th>
                            <th className="statCell header">HPB</th>
                            <th className="statCell header">SAC</th>
                            <th className="statCell header">SF</th>
                            <th className="statCell header">ROE</th>
                            <th className="statCell header">FC</th>
                            <th className="statCell header">SB</th>
                            <th className="statCell header">SB%</th>
                            <th className="statCell header">CS</th>
                            <th className="statCell header">PIK</th>
                        </tr>
                    </thead>
                    <tbody>
                            { content }
                    </tbody>
                    <tfoot>
                        <tr>
                                <td className="footerTitleCell">Team</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.general.gp}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.pa}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.ab}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.avg.toFixed(3).replace(/^0+/, '')}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.obp.toFixed(3).replace(/^0+/, '')}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.ops.toFixed(3).replace(/^0+/, '')}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.slg.toFixed(3).replace(/^0+/, '')}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.h}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["1B"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["2B"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["3B"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.hr}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.rbi}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.r}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.bb}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.so}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.sol}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.hbp}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.shb}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.shf}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.roe}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.fc}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.sb}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.offense["SB%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.cs}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.pik}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div className="Spacer__spacer Spacer__md Spacer__vertical" />
        <div className="StatsLegend__legendRow" data-testid="stats-legend">
            <dl>
                <dt>GP</dt>
                <dd>Games played</dd>
                <dt>PA</dt>
                <dd>Plate appearances</dd>
                <dt>AB</dt>
                <dd>At bats</dd>
                <dt>AVG</dt>
                <dd>Batting average</dd>
                <dt>OBP</dt>
                <dd>On-base percentage</dd>
                <dt>OPS</dt>
                <dd>On-base percentage plus slugging percentage</dd>
                <dt>SLG</dt>
                <dd>Slugging percentage</dd>
                <dt>H</dt>
                <dd>Hits</dd>
                <dt>1B</dt>
                <dd>Singles</dd>
                <dt>2B</dt>
                <dd>Doubles</dd>
                <dt>3B</dt>
                <dd>Triples</dd>
                <dt>HR</dt>
                <dd>Home runs</dd>
                <dt>RBI</dt>
                <dd>Runs batted in</dd>
            </dl>
            <dl>
                <dt>R</dt>
                <dd>Runs scored</dd>
                <dt>BB</dt>
                <dd>Base on balls (walks)</dd>
                <dt>SO</dt>
                <dd>Strikeouts</dd>
                <dt>K-L</dt>
                <dd>Strikeouts looking</dd>
                <dt>HBP</dt>
                <dd>Hit by pitch</dd>
                <dt>SAC</dt>
                <dd>Sacrifice hits &amp; bunts</dd>
                <dt>SF</dt>
                <dd>Sacrifice flies</dd>
                <dt>ROE</dt>
                <dd>Reached on error</dd>
                <dt>FC</dt>
                <dd>Hit into fielder's choice</dd>
                <dt>SB</dt>
                <dd>Stolen bases</dd>
                <dt>SB%</dt>
                <dd>Stolen base percentage</dd>
                <dt>CS</dt>
                <dd>Caught stealing</dd>
                <dt>PIK</dt>
                <dd>Picked off</dd>
            </dl>
        </div>
    </div>
    );

}

export default StandardBattingGrid;