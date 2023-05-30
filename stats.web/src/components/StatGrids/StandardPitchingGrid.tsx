import { } from "react-bootstrap";
import { Player, StatData, Players } from "../../models/models";


export interface GridProps {
    summary: StatData,
    player_stats: Players,
    player_names: Player[]
}

export const PitchSmart = ({ summary, player_stats, player_names }: GridProps) => {

    function getPlayer(id: string) {
        return player_names.find((player: Player) => player.id === id);
    }

    function formatInningsPitched(ip: number) {
        var innings = ip % 1;
        var result = "";
        if (parseFloat(innings.toFixed(2)) === .33) {
            result = parseInt(ip.toString()) + ".1"

        } else if (parseFloat(innings.toFixed(2)) === .67) {
            result = parseInt(ip.toString()) + ".2"

        } else {
            result = parseInt(ip.toString()) + ".0"
        }
        return result;
    }

    const content = Object.keys(player_stats).map<any>((player) => {
        if (player_stats[player].stats.defense) {
            return (
                <tr>
                    <th scope="row">{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</th>
                    <td>{formatInningsPitched(player_stats[player].stats.defense?.ip)}</td>
                    <td>{player_stats[player].stats.general.gp}</td>
                    <td>{player_stats[player].stats.defense?.gs}</td>
                    <td>{player_stats[player].stats.defense?.bf}</td>
                    <td>{player_stats[player].stats.defense["#P"]}</td>
                    <td>{player_stats[player].stats.defense?.w}</td>
                    <td>{player_stats[player].stats.defense?.l}</td>
                    <td>{player_stats[player].stats.defense?.sv}</td>
                    <td>{player_stats[player].stats.defense?.svo}</td>
                    <td>{player_stats[player].stats.defense?.bs}</td>
                    <td>{(player_stats[player].stats.defense["SV%"] * 100).toFixed(1)}</td>
                    <td>{player_stats[player].stats.defense?.h}</td>
                    <td>{player_stats[player].stats.defense?.r}</td>
                    <td>{player_stats[player].stats.defense?.er}</td>
                    <td>{player_stats[player].stats.defense?.bb}</td>
                    <td>{player_stats[player].stats.defense?.so}</td>
                    <td>{player_stats[player].stats.defense?.sol}</td>
                    <td>{player_stats[player].stats.defense?.hbp}</td>
                    <td>{player_stats[player].stats.defense?.era.toFixed(3)}</td>
                    <td>{player_stats[player].stats.defense?.whip.toFixed(3)}</td>
                    <td>{player_stats[player].stats.defense?.lob}</td>
                    <td>{player_stats[player].stats.defense?.bk}</td>
                    <td>{player_stats[player].stats.defense?.pik}</td>
                    <td>{player_stats[player].stats.defense?.cs}</td>
                    <td>{player_stats[player].stats.defense?.sb}</td>
                    <td>{(player_stats[player].stats.defense["SB%"] * 100).toFixed(3)}</td>
                    <td>{player_stats[player].stats.defense?.wp}</td>
                    <td>{player_stats[player].stats.defense?.baa.toFixed(3).replace(/^0+/, '')}</td>
                </tr>);
        } else {
            return (
                <tr>
                    <th scope="row">{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

            );
        }
    });

    return (
        <>
            <div id="stats_container">
                <div className="statsPageContainer grid">
                    <table className="table table-hover table-border">
                        <thead>
                            <tr>
                                <th scope="col">Player</th>
                                <th scope="col">IP</th>
                                <th scope="col">GP</th>
                                <th scope="col">GS</th>
                                <th scope="col">BF</th>
                                <th scope="col">#P</th>
                                <th scope="col">W</th>
                                <th scope="col">L</th>
                                <th scope="col">SV</th>
                                <th scope="col">SVO</th>
                                <th scope="col">BS</th>
                                <th scope="col">SV%</th>
                                <th scope="col">H</th>
                                <th scope="col">R</th>
                                <th scope="col">ER</th>
                                <th scope="col">BB</th>
                                <th scope="col">SO</th>
                                <th scope="col">K&#8209;L</th>
                                <th scope="col">HBP</th>
                                <th scope="col">ERA</th>
                                <th scope="col">WHIP</th>
                                <th scope="col">LOB</th>
                                <th scope="col">BK</th>
                                <th scope="col">PIK</th>
                                <th scope="col">CS</th>
                                <th scope="col">SB</th>
                                <th scope="col">SB%</th>
                                <th scope="col">WP</th>
                                <th scope="col">BAA</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {content}
                        </tbody>
                        <tfoot className="table-group-divider">
                            <tr>
                                <td>Team</td>
                                <td>{summary.defense.ip.toFixed(2)}</td>
                                <td>{summary.general.gp}</td>
                                <td>{summary.defense.gs}</td>
                                <td>{summary.defense.bf}</td>
                                <td>{summary.defense["#P"]}</td>
                                <td>{summary.defense.w}</td>
                                <td>{summary.defense.l}</td>
                                <td>{summary.defense.sv}</td>
                                <td>{summary.defense.svo}</td>
                                <td>{summary.defense.bs}</td>
                                <td>{(summary.defense["SV%"] * 100).toFixed(1)}</td>
                                <td>{summary.defense.h}</td>
                                <td>{summary.defense.r}</td>
                                <td>{summary.defense.er}</td>
                                <td>{summary.defense.bb}</td>
                                <td>{summary.defense.so}</td>
                                <td>{summary.defense.sol}</td>
                                <td>{summary.defense.hbp}</td>
                                <td>{summary.defense.era.toFixed(3)}</td>
                                <td>{summary.defense.whip.toFixed(3)}</td>
                                <td>{summary.defense.lob}</td>
                                <td>{summary.defense.bk}</td>
                                <td>{summary.defense.pik}</td>
                                <td>{summary.defense.cs}</td>
                                <td>{summary.defense.sb}</td>
                                <td>{(summary.defense["SB%"] * 100).toFixed(2)}</td>
                                <td>{summary.defense.wp}</td>
                                <td>{summary.defense.baa.toFixed(3).replace(/^0+/, '')}</td>
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

export default PitchSmart;