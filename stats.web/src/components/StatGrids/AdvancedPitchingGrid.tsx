import { } from "react-bootstrap";
import { Player, StatData, Players } from "../../models/models";


export interface GridProps {
    summary: StatData,
    player_stats: Players,
    player_names: Player[]
}

export const AdvancedPitchingGrid = ({ summary, player_stats, player_names }: GridProps) => {

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
                    <td>{formatInningsPitched(player_stats[player].stats.defense.ip)}</td>
                    <td>{player_stats[player].stats.defense.bf}</td>
                    <td>{player_stats[player].stats.defense["P/IP"].toFixed(1)}</td>
                    <td>{player_stats[player].stats.defense["P/BF"].toFixed(3)}</td>
                    <td>{(player_stats[player].stats.defense["<3%"] * 100).toFixed(2)}</td>
                    <td>{player_stats[player].stats.defense.loo}</td>
                    <td>{player_stats[player].stats.defense["1ST2OUT"]}</td>
                    <td>{player_stats[player].stats.defense["123INN"]}</td>
                    <td>{player_stats[player].stats.defense["<13"]}</td>
                    <td>{player_stats[player].stats.defense.fip.toFixed(3)}</td>
                    <td>{(player_stats[player].stats.defense["S%"] * 100).toFixed(2)}</td>
                    <td>{(player_stats[player].stats.defense["FPS%"] * 100).toFixed(2)}</td>
                    <td>{(player_stats[player].stats.defense["FPSO%"] * 100).toFixed(2)}</td>
                    <td>{(player_stats[player].stats.defense["FPSW%"] * 100).toFixed(2)}</td>
                    <td>{(player_stats[player].stats.defense["FPSH%"] * 100).toFixed(2)}</td>
                    <td>{player_stats[player].stats.defense["BB/INN"].toFixed(3).replace(/^0+/, '')}</td>
                    <td>{player_stats[player].stats.defense["0BBINN"]}</td>
                    <td>{player_stats[player].stats.defense.bbs}</td>
                    <td>{player_stats[player].stats.defense.lobb}</td>
                    <td>{player_stats[player].stats.defense.lobbs}</td>
                    <td>{(player_stats[player].stats.defense["SM%"] * 100).toFixed(2)}</td>
                    <td>{player_stats[player].stats.defense["K/BF"].toFixed(3).replace(/^0+/, '')}</td>
                    <td>{player_stats[player].stats.defense["K/BB"].toFixed(3)}</td>
                    <td>{(player_stats[player].stats.defense["WEAK%"] * 100).toFixed(2)}</td>
                    <td>{(player_stats[player].stats.defense["HARD%"] * 100).toFixed(2)}</td>
                    <td>{(player_stats[player].stats.defense["GO/AO"] * 100).toFixed(3)}</td>
                    <td>{player_stats[player].stats.defense.hr}</td>
                    <td>{(player_stats[player].stats.defense["LND%"] * 100).toFixed(2)}</td>
                    <td>{(player_stats[player].stats.defense["FLB%"] * 100).toFixed(3)}</td>
                    <td>{(player_stats[player].stats.defense["GB%"] * 100).toFixed(3)}</td>
                    <td>{player_stats[player].stats.defense.babip.toFixed(3).replace(/^0+/, '')}</td>
                    <td>{player_stats[player].stats.defense["BA/RISP"].toFixed(3).replace(/^0+/, '')}</td>
                </tr>);
        }
        return "";
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
                                <th scope="col">BF</th>
                                <th scope="col">P/IP</th>
                                <th scope="col">P/BF</th>
                                <th scope="col">3%</th>
                                <th scope="col">LOO</th>
                                <th scope="col">1ST2OUT/K</th>
                                <th scope="col">123INN</th>
                                <th scope="col">13</th>
                                <th scope="col">FIP</th>
                                <th scope="col">S%</th>
                                <th scope="col">FPS%</th>
                                <th scope="col">FPSO%</th>
                                <th scope="col">FPSW%</th>
                                <th scope="col">FPSH%</th>
                                <th scope="col">BB/INN</th>
                                <th scope="col">OBBINN</th>
                                <th scope="col">BBS</th>
                                <th scope="col">LOBB</th>
                                <th scope="col">LOBBS</th>
                                <th scope="col">SM%</th>
                                <th scope="col">K/BF</th>
                                <th scope="col">K/BB</th>
                                <th scope="col">WEAK%</th>
                                <th scope="col">HHB%</th>
                                <th scope="col">GO/AO</th>
                                <th scope="col">HR</th>
                                <th scope="col">LD%</th>
                                <th scope="col">FB%</th>
                                <th scope="col">GB%</th>
                                <th scope="col">BABIP</th>
                                <th scope="col">BARISP</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {content}
                        </tbody>
                        <tfoot className="table-group-divider">
                            <tr>
                                <td>Team</td>
                                <td>{summary.defense.ip.toFixed(1)}</td>
                                <td>{summary.defense.bf}</td>
                                <td>{summary.defense["P/IP"].toFixed(1)}</td>
                                <td>{summary.defense["P/BF"].toFixed(3)}</td>
                                <td>{(summary.defense["<3%"] * 100).toFixed(2)}</td>
                                <td>{summary.defense.loo}</td>
                                <td>{summary.defense["1ST2OUT"]}</td>
                                <td>{summary.defense["123INN"]}</td>
                                <td>{summary.defense["<13"]}</td>
                                <td>{summary.defense.fip.toFixed(3)}</td>
                                <td>{(summary.defense["S%"] * 100).toFixed(2)}</td>
                                <td>{(summary.defense["FPS%"] * 100).toFixed(2)}</td>
                                <td>{(summary.defense["FPSO%"] * 100).toFixed(2)}</td>
                                <td>{(summary.defense["FPSW%"] * 100).toFixed(2)}</td>
                                <td>{(summary.defense["FPSH%"] * 100).toFixed(2)}</td>
                                <td>{summary.defense["BB/INN"].toFixed(3).replace(/^0+/, '')}</td>
                                <td>{summary.defense["0BBINN"]}</td>
                                <td>{summary.defense.bbs}</td>
                                <td>{summary.defense.lobb}</td>
                                <td>{summary.defense.lobbs}</td>
                                <td>{(summary.defense["SM%"] * 100).toFixed(2)}</td>
                                <td>{summary.defense["K/BF"].toFixed(3).replace(/^0+/, '')}</td>
                                <td>{summary.defense["K/BB"].toFixed(3)}</td>
                                <td>{(summary.defense["WEAK%"] * 100).toFixed(2)}</td>
                                <td>{(summary.defense["HARD%"] * 100).toFixed(2)}</td>
                                <td>{(summary.defense["GO/AO"] * 100).toFixed(3)}</td>
                                <td>{summary.defense.hr}</td>
                                <td>{(summary.defense["LND%"] * 100).toFixed(2)}</td>
                                <td>{(summary.defense["FLB%"] * 100).toFixed(3)}</td>
                                <td>{(summary.defense["GB%"] * 100).toFixed(3)}</td>
                                <td>{summary.defense.babip.toFixed(3).replace(/^0+/, '')}</td>
                                <td>{summary.defense["BA/RISP"].toFixed(3).replace(/^0+/, '')}</td>
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
        </>
    );

}

export default AdvancedPitchingGrid;