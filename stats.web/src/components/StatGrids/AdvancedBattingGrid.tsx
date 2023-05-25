import { } from "react-bootstrap";
import { Player, StatData, Players } from "../../models/models";


export interface GridProps {
    summary: StatData,
    player_stats: Players,
    player_names: Player[]
}

export const AdvancedBattingGrid = ({ summary, player_stats, player_names }: GridProps) => {

    function getPlayer(id: string) {
        return player_names.find((player: Player) => player.id === id);
    }

    const content = Object.keys(player_stats).map<any>((player) => {
        if (player_stats[player].stats.offense) {
            return (
                <tr>
                    <th  scope="row">{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</th>
                    <td>{player_stats[player].stats.general.gp}</td>
                    <td>{player_stats[player].stats.offense.pa}</td>
                    <td>{player_stats[player].stats.offense.ab}</td>
                    <td>{player_stats[player].stats.offense.qab}</td>
                    <td>{(player_stats[player].stats.offense["QAB%"] * 100).toFixed(2)}</td>
                    <td>{player_stats[player].stats.offense["PA/BB"].toFixed(1)}</td>
                    <td>{player_stats[player].stats.offense["BB/K"].toFixed(3).replace(/^0+/, '')}</td>
                    <td>{(player_stats[player].stats.offense["C%"] * 100).toFixed(2)}</td>
                    <td>{player_stats[player].stats.offense.hard}</td>
                    <td>{(player_stats[player].stats.offense["LND%"] * 100).toFixed(2)}</td>
                    <td>{(player_stats[player].stats.offense["FLB%"] * 100).toFixed(2)}</td>
                    <td>{(player_stats[player].stats.offense["GB%"] * 100).toFixed(2)}</td>
                    <td>{player_stats[player].stats.offense.babip.toFixed(3)}</td>
                    <td>{player_stats[player].stats.offense["BA/RISP"].toFixed(3).replace(/^0+/, '')}</td>
                    <td>{player_stats[player].stats.offense.lob}</td>
                    <td>{player_stats[player].stats.offense["_2OUTRBI"]}</td>
                    <td>{player_stats[player].stats.offense.xbh}</td>
                    <td>{player_stats[player].stats.offense.tb}</td>
                    <td>{player_stats[player].stats.offense.ps}</td>
                    <td>{player_stats[player].stats.offense["PS/PA"].toFixed(3)}</td>
                    <td>{player_stats[player].stats.offense["2S+3"]}</td>
                    <td>{(player_stats[player].stats.offense["2S+3%"] * 100).toFixed(2)}</td>
                    <td>{player_stats[player].stats.offense["6+"]}</td>
                    <td>{(player_stats[player].stats.offense["6+%"] * 100).toFixed(2)}</td>
                    <td>{player_stats[player].stats.offense["AB/HR"].toFixed(2)}</td>
                    <td>{player_stats[player].stats.offense.gidp}</td>
                    <td>{player_stats[player].stats.offense.gitp}</td>
                    <td>{player_stats[player].stats.offense.ci}</td>
                </tr>);
        } else {
            return "";
        }

    });


    return (
        <>
            <div id="stats_container">
                <div className="statsPageContainer grid">
                    <table className="table table-hover table-border table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Player</th>
                                <th scope="col">GP</th>
                                <th scope="col">PA</th>
                                <th scope="col">AB</th>
                                <th scope="col">QAB</th>
                                <th scope="col">QAB%</th>
                                <th scope="col">PA/BB</th>
                                <th scope="col">BB/K</th>
                                <th scope="col">C%</th>
                                <th scope="col">HHB</th>
                                <th scope="col">LD%</th>
                                <th scope="col">FB%</th>
                                <th scope="col">GB%</th>
                                <th scope="col">BABIP</th>
                                <th scope="col">BA/RISP</th>
                                <th scope="col">LOB</th>
                                <th scope="col">2OUTRBI</th>
                                <th scope="col">XBH</th>
                                <th scope="col">TB</th>
                                <th scope="col">PS</th>
                                <th scope="col">PS/PA</th>
                                <th scope="col">2S+3</th>
                                <th scope="col">2S+3%</th>
                                <th scope="col">6+</th>
                                <th scope="col">6+%</th>
                                <th scope="col">AB/HR</th>
                                <th scope="col">GIDP</th>
                                <th scope="col">GITP</th>
                                <th scope="col">CI</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {content}
                        </tbody>
                        <tfoot className="table-group-divider">
                            <tr>
                                <td>Team</td>
                                <td>{summary.general.gp}</td>
                                <td>{summary.offense.pa}</td>
                                <td>{summary.offense.ab}</td>
                                <td>{summary.offense.qab}</td>
                                <td>{(summary.offense["QAB%"] * 100).toFixed(2)}</td>
                                <td>{summary.offense["PA/BB"].toFixed(1)}</td>
                                <td>{summary.offense["BB/K"].toFixed(3).replace(/^0+/, '')}</td>
                                <td>{(summary.offense["C%"] * 100).toFixed(2)}</td>
                                <td>{summary.offense.hard}</td>
                                <td>{(summary.offense["LND%"] * 100).toFixed(2)}</td>
                                <td>{(summary.offense["FLB%"] * 100).toFixed(2)}</td>
                                <td>{(summary.offense["GB%"] * 100).toFixed(2)}</td>
                                <td>{summary.offense.babip.toFixed(3)}</td>
                                <td>{summary.offense["BA/RISP"].toFixed(3)}</td>
                                <td>{summary.offense.lob}</td>
                                <td>{summary.offense._2OUTRBI}</td>
                                <td>{summary.offense.xbh}</td>
                                <td>{summary.offense.tb}</td>
                                <td>{summary.offense.ps}</td>
                                <td>{summary.offense["PS/PA"].toFixed(3)}</td>
                                <td>{summary.offense["2S+3"]}</td>
                                <td>{(summary.offense["2S+3%"] * 100).toFixed(2)}</td>
                                <td>{summary.offense["6+"]}</td>
                                <td>{(summary.offense["6+%"] * 100).toFixed(2)}</td>
                                <td>{summary.offense["AB/HR"].toFixed(2)}</td>
                                <td>{summary.offense.gidp}</td>
                                <td>{summary.offense.gitp}</td>
                                <td>{summary.offense.ci}</td>
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
                    <dt>QAB</dt>
                    <dd>Quality at bats (any one of: 3 pitches after 2 strikes, 6+ pitch ABs, XBH, HHB, BB, SAC Bunt, SAC Fly)</dd>
                    <dt>QAB%</dt>
                    <dd>Quality at bats per plate appearance</dd>
                    <dt>PA/BB</dt>
                    <dd>Plate appearances per walk</dd>
                    <dt>BB/K</dt>
                    <dd>Walks per strikeout</dd>
                    <dt>C%</dt>
                    <dd>Contact percentage/Contact rate: AB-K/AB</dd>
                    <dt>HHB</dt>
                    <dd>Hard hit balls: Total line drives and hard ground balls</dd>
                    <dt>LD%</dt>
                    <dd>Line drive percentage</dd>
                    <dt>FB%</dt>
                    <dd>Fly ball percentage</dd>
                    <dt>GB%</dt>
                    <dd>Ground ball percentage</dd>
                    <dt>BABIP</dt>
                    <dd>Batting average on balls in play</dd>
                    <dt>BA/RISP</dt>
                    <dd>Batting average with runners in scoring position</dd>
                </dl>
                <dl>
                    <dt>LOB</dt>
                    <dd>Runners left on base</dd>
                    <dt>2OUTRBI</dt>
                    <dd>2-out RBI</dd>
                    <dt>XBH</dt>
                    <dd>Extra-base hits</dd>
                    <dt>TB</dt>
                    <dd>Total bases</dd>
                    <dt>PS</dt>
                    <dd>Pitches seen</dd>
                    <dt>PS/PA</dt>
                    <dd>Pitches seen per plate appearance</dd>
                    <dt>2S+3</dt>
                    <dd>Plate appearances in which batter sees 3+ pitches after 2 strikes</dd>
                    <dt>2S+3%</dt>
                    <dd>% of plate appearances in which batter sees 3+ pitches after 2 strikes</dd>
                    <dt>6+</dt>
                    <dd>Plate appearances with 6+ pitches</dd>
                    <dt>6+%</dt>
                    <dd>% of plate appearances of 6+ pitches</dd>
                    <dt>AB/HR</dt>
                    <dd>At bats per home run</dd>
                    <dt>GIDP</dt>
                    <dd>Hit into double play</dd>
                    <dt>GITP</dt>
                    <dd>Hit into triple play</dd>
                    <dt>CI</dt>
                    <dd>Batter advances on catcher's interference</dd>
                </dl>
            </div>
        </>
    );

}

export default AdvancedBattingGrid;