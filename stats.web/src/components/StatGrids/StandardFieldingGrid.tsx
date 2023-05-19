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
                <tr className="whiteRow odd">
                    <td className="playerNameCell invertLinkUnderline strong">{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</td>
                    <td className="statCell">{player_stats[player].stats.defense.tc}</td>
                    <td className="statCell">{player_stats[player].stats.defense.a}</td>
                    <td className="statCell">{player_stats[player].stats.defense.po}</td>
                    <td className="statCell">{player_stats[player].stats.defense.fpct.toFixed(3).replace(/^0+/, '')}</td>
                    <td className="statCell">{player_stats[player].stats.defense.e}</td>
                    <td className="statCell">{player_stats[player].stats.defense.dp}</td>
                </tr>);
        } else {
            return (
                <tr>
                    <td></td>
                    <td className="statCell"></td>
                    <td className="statCell"></td>
                    <td className="statCell"></td>
                    <td className="statCell"></td>
                    <td className="statCell"></td>
                    <td className="statCell"></td>
                </tr>
            );
        }
    });


    return (
        <>
            <div id="stats_container">
                <div className="statsPageContainer grid">
                    <table className="gcTable statTable withGridLines withOutline withHoverHighlighting">
                        <thead>
                            <tr>
                                <th className="playerNameCell invertLinkUnderline strong header headerSortDown">Player</th>
                                <th className="statCell header">TC</th>
                                <th className="statCell header">A</th>
                                <th className="statCell header">PO</th>
                                <th className="statCell header">FPCT</th>
                                <th className="statCell header">E</th>
                                <th className="statCell header">DP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="footerTitleCell">Team</td>
                                <td className="statCell">{summary.defense.tc}</td>
                                <td className="statCell">{summary.defense.a}</td>
                                <td className="statCell">{summary.defense.po}</td>
                                <td className="statCell">{summary.defense.fpct.toFixed(3).replace(/^0+/, '')}</td>
                                <td className="statCell">{summary.defense.e}</td>
                                <td className="statCell">{summary.defense.dp}</td>
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