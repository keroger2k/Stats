import { } from "react-bootstrap";
import { Team, Player } from "../models/models";

function AdvancedBattingGrid(team: Team) {

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
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.qab}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["QAB%"] * 100).toFixed(2)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["PA/BB"].toFixed(1)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["BB/K"].toFixed(3).replace(/^0+/, '')}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["C%"] * 100).toFixed(2)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.hard}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["LND%"] * 100).toFixed(2)}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["FLB%"] * 100).toFixed(2)}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["GB%"] * 100).toFixed(2)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.babip.toFixed(3)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["BA/RISP"].toFixed(3).replace(/^0+/, '')}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.lob}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["_2OUTRBI"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.xbh}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.tb}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.ps}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["PS/PA"].toFixed(3)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["2S+3"]}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["2S+3%"] * 100).toFixed(2)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["6+"]}</td>
                <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["6+%"] * 100).toFixed(2)}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["AB/HR"]}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.gidp}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.gitp}</td>
                <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.ci}</td>
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
                                <th className="statCell header">GP</th>
                                <th className="statCell header">PA</th>
                                <th className="statCell header">AB</th>
                                <th className="statCell header">QAB</th>
                                <th className="statCell header">QAB%</th>
                                <th className="statCell header">PA/BB</th>
                                <th className="statCell header">BB/K</th>
                                <th className="statCell header">C%</th>
                                <th className="statCell header">HHB</th>
                                <th className="statCell header">LD%</th>
                                <th className="statCell header">FB%</th>
                                <th className="statCell header">GB%</th>
                                <th className="statCell header">BABIP</th>
                                <th className="statCell header">BA/RISP</th>
                                <th className="statCell header">LOB</th>
                                <th className="statCell header">2OUTRBI</th>
                                <th className="statCell header">XBH</th>
                                <th className="statCell header">TB</th>
                                <th className="statCell header">PS</th>
                                <th className="statCell header">PS/PA</th>
                                <th className="statCell header">2S+3</th>
                                <th className="statCell header">2S+3%</th>
                                <th className="statCell header">6+</th>
                                <th className="statCell header">6+%</th>
                                <th className="statCell header">AB/HR</th>
                                <th className="statCell header">GIDP</th>
                                <th className="statCell header">GITP</th>
                                <th className="statCell header">CI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="footerTitleCell">Team</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.general.gp}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.pa}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.ab}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.qab}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.offense["QAB%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["PA/BB"].toFixed(1)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["BB/K"].toFixed(3).replace(/^0+/, '')}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.offense["C%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.hard}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.offense["LND%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.offense["FLB%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.offense["GB%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.babip.toFixed(3)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["BA/RISP"].toFixed(3)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.lob}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense._2OUTRBI}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.xbh}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.tb}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.ps}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["PS/PA"].toFixed(3)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["2S+3"]}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.offense["2S+3%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["6+"]}</td>
                                <td className="statCell">{(team.season_stats.stats_data.stats.offense["6+%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense["AB/HR"]}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.gidp}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.gitp}</td>
                                <td className="statCell">{team.season_stats.stats_data.stats.offense.ci}</td>
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

export default AdvancedBattingGrid;