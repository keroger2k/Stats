import { } from "react-bootstrap";
import {  Player, StatData, Players } from "../../models/models";


export interface GridProps {
    summary: StatData,
    player_stats: Players,
    player_names: Player[]
}

export const StandardCatchingGrid = ({ summary, player_stats, player_names }: GridProps) => {

    function getPlayer(id: string) {
        return player_names.find((player: Player) => player.id === id);
    }

    const content = Object.keys(player_stats).map<any>((player) => {
        if (player_stats[player].stats.defense && player_stats[player].stats.defense["GP:C"] !== 0) {
            return (

                <tr className="whiteRow odd">
                    <td className="playerNameCell invertLinkUnderline strong">{`${getPlayer(player)?.first_name} ${getPlayer(player)?.last_name}, #${getPlayer(player)?.number}`}</td>
                    <td className="statCell">{player_stats[player].stats.defense["IC:C"].toFixed(1)}</td>
                    <td className="statCell">{player_stats[player].stats.defense["PB:C"]}</td>
                    <td className="statCell">{player_stats[player].stats.defense["SB:C"]}</td>
                    <td className="statCell">{`${player_stats[player].stats.defense["SB:C"]}-${player_stats[player].stats.defense["SBATT:C"]}`}</td>
                    <td className="statCell">{player_stats[player].stats.defense["CS:C"]}</td>
                    <td className="statCell">{(player_stats[player].stats.defense["CS:C%"] * 100).toFixed(2)}</td>
                    <td className="statCell">{player_stats[player].stats.defense["PIK:C"]}</td>
                    <td className="statCell">{player_stats[player].stats.defense["CI:C"]}</td>
                </tr>);
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
                                <th className="statCell header">INN</th>
                                <th className="statCell header">PB</th>
                                <th className="statCell header">SB</th>
                                <th className="statCell header">SB-ATT</th>
                                <th className="statCell header">CS</th>
                                <th className="statCell header">CS%</th>
                                <th className="statCell header">PIK</th>
                                <th className="statCell header">CI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="footerTitleCell">Team</td>
                                <td className="statCell">{summary.defense["IC:C"].toFixed(1)}</td>
                                <td className="statCell">{summary.defense["PB:C"]}</td>
                                <td className="statCell">{summary.defense["SB:C"]}</td>
                                <td className="statCell">{`${summary.defense["SB:C"]}-${summary.defense["SBATT:C"]}`}</td>
                                <td className="statCell">{summary.defense["CS:C"]}</td>
                                <td className="statCell">{(summary.defense["CS:C%"] * 100).toFixed(2)}</td>
                                <td className="statCell">{summary.defense["PIK:C"]}</td>
                                <td className="statCell">{summary.defense["CI:C"]}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className="Spacer__spacer Spacer__md Spacer__vertical" />
            <div className="StatsLegend__legendRow" data-testid="stats-legend">
                <dl>
                    <dt>INN</dt>
                    <dd>Innings played as catcher</dd>
                    <dt>PB</dt>
                    <dd>Passed balls allowed</dd>
                    <dt>SB</dt>
                    <dd>Stolen bases allowed</dd>
                    <dt>SB-ATT</dt>
                    <dd>Stolen bases - Stealing attempts</dd>
                </dl>
                <dl>
                    <dt>CS</dt>
                    <dd>Runners caught stealing</dd>
                    <dt>CS%</dt>
                    <dd>Runners caught stealing percentage</dd>
                    <dt>PIK</dt>
                    <dd>Runners picked off</dd>
                    <dt>CI</dt>
                    <dd>Batter advances on catcher's interference</dd>
                </dl>
            </div>
        </>
    );

}

export default StandardCatchingGrid;