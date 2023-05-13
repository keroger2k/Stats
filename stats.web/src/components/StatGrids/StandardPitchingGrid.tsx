import { } from "react-bootstrap";
import { Team, Player } from "../../models/models";

function StandardPitchingGrid(team: Team) {

    function getPlayer(id: string) {
        return team.players.find((player: Player) => player.id === id);
    }

    const content = Object.keys(team.season_stats.stats_data.players).map<any>((player) => {
        return (
            <tr className="whiteRow odd">
                <td className="playerNameCell invertLinkUnderline strong">{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.ip.toFixed(2)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.general.gp}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.gs}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.bf}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense["#P"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.w}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.l}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.sv}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.svo}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.bs}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.SVPercent}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.h}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.r}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.er}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.bb}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.so}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.sol}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.hbp}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.era.toFixed(3)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.whip.toFixed(3)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.lob}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.bk}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.pik}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.cs}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.sb}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.defense["SB%"] * 100).toFixed(3)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.wp}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.defense.baa.toFixed(3).replace(/^0+/, '')}</td>
            </tr>);
    });

    return (
        <>
            <div id="stats_container">
                <div className="statsPageContainer grid">
                    <table className="gcTable statTable withGridLines withOutline withHoverHighlighting">
                        <thead>
                            <tr>
                                <th className="playerNameCell invertLinkUnderline strong header headerSortDown">Player</th>
                                <th className="statCell header">IP</th>
                                <th className="statCell header">GP</th>
                                <th className="statCell header">GS</th>
                                <th className="statCell header">BF</th>
                                <th className="statCell header">#P</th>
                                <th className="statCell header">W</th>
                                <th className="statCell header">L</th>
                                <th className="statCell header">SV</th>
                                <th className="statCell header">SVO</th>
                                <th className="statCell header">BS</th>
                                <th className="statCell header">SV%</th>
                                <th className="statCell header">H</th>
                                <th className="statCell header">R</th>
                                <th className="statCell header">ER</th>
                                <th className="statCell header">BB</th>
                                <th className="statCell header">SO</th>
                                <th className="statCell header">K-L</th>
                                <th className="statCell header">HBP</th>
                                <th className="statCell header">ERA</th>
                                <th className="statCell header">WHIP</th>
                                <th className="statCell header">LOB</th>
                                <th className="statCell header">BK</th>
                                <th className="statCell header">PIK</th>
                                <th className="statCell header">CS</th>
                                <th className="statCell header">SB</th>
                                <th className="statCell header">SB%</th>
                                <th className="statCell header">WP</th>
                                <th className="statCell header">BAA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="footerTitleCell">Team</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.ip.toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.general.gp}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.gs}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.bf}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense["#P"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.w}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.l}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.sv}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.svo}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.bs}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.SVPercent}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.h}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.r}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.er}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.bb}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.so}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.sol}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.hbp}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.era.toFixed(3)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.whip.toFixed(3)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.lob}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.bk}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.pik}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.cs}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.sb}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.defense["SB%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.wp}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.defense.baa.toFixed(3).replace(/^0+/, '')}</td>
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
                    <dt>GP</dt>
                    <dd>Games pitched</dd>
                    <dt>GS</dt>
                    <dd>Games started</dd>
                    <dt>BF</dt>
                    <dd>Total batters faced</dd>
                    <dt>#P</dt>
                    <dd>Total pitches</dd>
                    <dt>W</dt>
                    <dd>Wins</dd>
                    <dt>L</dt>
                    <dd>Losses</dd>
                    <dt>SV</dt>
                    <dd>Saves</dd>
                    <dt>SVO</dt>
                    <dd>Save opportunities</dd>
                    <dt>BS</dt>
                    <dd>Blown saves</dd>
                    <dt>SV%</dt>
                    <dd>Save percentage</dd>
                    <dt>H</dt>
                    <dd>Hits allowed</dd>
                    <dt>R</dt>
                    <dd>Runs allowed</dd>
                    <dt>ER</dt>
                    <dd>Earned runs allowed</dd>
                </dl>
                <dl>
                    <dt>BB</dt>
                    <dd>Base on balls (walks)</dd>
                    <dt>SO</dt>
                    <dd>Strikeouts</dd>
                    <dt>K-L</dt>
                    <dd>Strikeouts looking</dd>
                    <dt>HBP</dt>
                    <dd>Hit batters</dd>
                    <dt>ERA</dt>
                    <dd>Earned run average</dd>
                    <dt>WHIP</dt>
                    <dd>Walks plus hits per innings pitched</dd>
                    <dt>LOB</dt>
                    <dd>Runners left on base</dd>
                    <dt>BK</dt>
                    <dd>Balks</dd>
                    <dt>PIK</dt>
                    <dd>Runners picked off</dd>
                    <dt>CS</dt>
                    <dd>Runners caught stealing</dd>
                    <dt>SB</dt>
                    <dd>Stolen bases allowed</dd>
                    <dt>SB%</dt>
                    <dd>Stolen bases allowed percentage</dd>
                    <dt>WP</dt>
                    <dd>Wild pitches</dd>
                    <dt>BAA</dt>
                    <dd>Opponent batting average</dd>
                </dl>
            </div>

        </>
    );
}

export default StandardPitchingGrid;