import { } from "react-bootstrap";
import { Player, StatData, Players } from "../../models/models";


export interface GridProps {
    summary: StatData,
    player_stats: Players,
    player_names: Player[]
}

export const StandardFieldingGrid = ({ summary, player_stats, player_names }: GridProps) => {

    function getPlayer(id: string) {
        return player_names.find((player: Player) => player.id === id);
    }

    const content = Object.keys(player_stats).map<any>((player) => {
        if (player_stats[player].stats.defense) {
            return (
                <tr>
                    <th scope="row">{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</th>
                    <td>{player_stats[player].stats.defense.tc}</td>
                    <td>{player_stats[player].stats.defense.a}</td>
                    <td>{player_stats[player].stats.defense.po}</td>
                    <td>{player_stats[player].stats.defense.fpct.toFixed(3).replace(/^0+/, '')}</td>
                    <td>{player_stats[player].stats.defense.e}</td>
                    <td>{player_stats[player].stats.defense.dp}</td>
                </tr>);
        } else {
            return (
                <tr>
                    <th scope="row"></th>
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
                                <th scope="col">TC</th>
                                <th scope="col">A</th>
                                <th scope="col">PO</th>
                                <th scope="col">FPCT</th>
                                <th scope="col">E</th>
                                <th scope="col">DP</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {content}
                        </tbody>
                        <tfoot className="table-group-divider">
                            <tr>
                                <td>Team</td>
                                <td>{summary.defense.tc}</td>
                                <td>{summary.defense.a}</td>
                                <td>{summary.defense.po}</td>
                                <td>{summary.defense.fpct.toFixed(3).replace(/^0+/, '')}</td>
                                <td>{summary.defense.e}</td>
                                <td>{summary.defense.dp}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className="Spacer__spacer Spacer__md Spacer__vertical" />
            <div className="StatsLegend__legendRow" data-testid="stats-legend">
                <dl>
                    <dt>TC</dt>
                    <dd>Total Chances</dd>
                    <dt>A</dt>
                    <dd>Assists</dd>
                    <dt>PO</dt>
                    <dd>Putouts</dd>
                    <dt>FPCT</dt>
                    <dd>Fielding Percentage</dd>
                </dl>
                <dl>
                    <dt>E</dt>
                    <dd>Errors</dd>
                    <dt>DP</dt>
                    <dd>Double Plays</dd>
                    <dt>TP</dt>
                    <dd>Triple Plays</dd>
                </dl>
            </div>
        </>
    );

}

export default StandardFieldingGrid;