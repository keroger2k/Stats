import { } from "react-bootstrap";
import { Player, StatData, Players } from "../../models/models";


export interface GridProps {
    summary: StatData,
    player_stats: Players,
    player_names: Player[]
}

export const StandardBattingGrid = ({ summary, player_stats, player_names }: GridProps) => {

    function getPlayer(id: string) {
        return player_names.find((player: Player) => player.id === id);
    }

    const content = Object.keys(player_stats).map<any>((player) => {
        if (player_stats[player].stats.offense) {
            return (
                <tr >
                    <th scope="row" >{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</th>
                    <td>{player_stats[player].stats.general.gp}</td>
                    <td>{player_stats[player].stats.offense.pa}</td>
                    <td>{player_stats[player].stats.offense.ab}</td>
                    <td>{player_stats[player].stats.offense.avg.toFixed(3).replace(/^0+/, '')}</td>
                    <td>{player_stats[player].stats.offense.obp.toFixed(3).replace(/^0+/, '')}</td>
                    <td>{player_stats[player].stats.offense.ops.toFixed(3).replace(/^0+/, '')}</td>
                    <td>{player_stats[player].stats.offense.slg.toFixed(3).replace(/^0+/, '')}</td>
                    <td>{player_stats[player].stats.offense.h}</td>
                    <td>{player_stats[player].stats.offense["1B"]}</td>
                    <td>{player_stats[player].stats.offense["2B"]}</td>
                    <td>{player_stats[player].stats.offense["3B"]}</td>
                    <td>{player_stats[player].stats.offense.hr}</td>
                    <td>{player_stats[player].stats.offense.rbi}</td>
                    <td>{player_stats[player].stats.offense.r}</td>
                    <td>{player_stats[player].stats.offense.bb}</td>
                    <td>{player_stats[player].stats.offense.so}</td>
                    <td>{player_stats[player].stats.offense.sol}</td>
                    <td>{player_stats[player].stats.offense.hbp}</td>
                    <td>{player_stats[player].stats.offense.shb}</td>
                    <td>{player_stats[player].stats.offense.shf}</td>
                    <td>{player_stats[player].stats.offense.roe}</td>
                    <td>{player_stats[player].stats.offense.fc}</td>
                    <td>{player_stats[player].stats.offense.sb}</td>
                    <td>{(player_stats[player].stats.offense["SB%"] * 100).toFixed(2)}</td>
                    <td>{player_stats[player].stats.offense.cs}</td>
                    <td>{player_stats[player].stats.offense.pik}</td>
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
                                <th scope="col" >Player</th>
                                <th scope="col" >GP</th>
                                <th scope="col" >PA</th>
                                <th scope="col" >AB</th>
                                <th scope="col" >AVG</th>
                                <th scope="col" >OBP</th>
                                <th scope="col" >OPS</th>
                                <th scope="col" >SLG</th>
                                <th scope="col" >H</th>
                                <th scope="col" >1B</th>
                                <th scope="col" >2B</th>
                                <th scope="col" >3B</th>
                                <th scope="col" >HR</th>
                                <th scope="col" >RBI</th>
                                <th scope="col" >R</th>
                                <th scope="col" >BB</th>
                                <th scope="col" >SO</th>
                                <th scope="col" >K-L</th>
                                <th scope="col" >HBP</th>
                                <th scope="col" >SAC</th>
                                <th scope="col" >SF</th>
                                <th scope="col" >ROE</th>
                                <th scope="col" >FC</th>
                                <th scope="col" >SB</th>
                                <th scope="col" >SB%</th>
                                <th scope="col" >CS</th>
                                <th scope="col" >PIK</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {content}
                        </tbody>
                        <tfoot className="table-group-divider">
                            <tr>
                                <td >Team</td>
                                <td >{summary.general.gp}</td>
                                <td >{summary.offense.pa}</td>
                                <td >{summary.offense.ab}</td>
                                <td >{summary.offense.avg.toFixed(3).replace(/^0+/, '')}</td>
                                <td >{summary.offense.obp.toFixed(3).replace(/^0+/, '')}</td>
                                <td >{summary.offense.ops.toFixed(3).replace(/^0+/, '')}</td>
                                <td >{summary.offense.slg.toFixed(3).replace(/^0+/, '')}</td>
                                <td >{summary.offense.h}</td>
                                <td >{summary.offense["1B"]}</td>
                                <td >{summary.offense["2B"]}</td>
                                <td >{summary.offense["3B"]}</td>
                                <td >{summary.offense.hr}</td>
                                <td >{summary.offense.rbi}</td>
                                <td >{summary.offense.r}</td>
                                <td >{summary.offense.bb}</td>
                                <td >{summary.offense.so}</td>
                                <td >{summary.offense.sol}</td>
                                <td >{summary.offense.hbp}</td>
                                <td >{summary.offense.shb}</td>
                                <td >{summary.offense.shf}</td>
                                <td >{summary.offense.roe}</td>
                                <td >{summary.offense.fc}</td>
                                <td >{summary.offense.sb}</td>
                                <td >{(summary.offense["SB%"] * 100).toFixed(2)}</td>
                                <td >{summary.offense.cs}</td>
                                <td >{summary.offense.pik}</td>
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
        </>
    );

}

export default StandardBattingGrid;