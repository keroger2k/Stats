import { } from "react-bootstrap";
import { Team, Player } from "../models/models";

function StandardGrid(team: Team) {

    function getPlayer(id: string) {
        return team.players.find((player: Player) => player.id === id);
    }



    const content = Object.keys(team.season_stats.stats_data.players).map<any>((player) => {
        return (<tr className="whiteRow odd">
            <td className="jerseyNumberCell">{getPlayer(player)?.number}</td>
            <td className="playerNameCell invertLinkUnderline strong">{getPlayer(player)?.first_name}</td>
            <td className="playerNameCell invertLinkUnderline strong">{getPlayer(player)?.last_name}</td>
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
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense["SB%"].toFixed(3) }</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.cs}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.pik}</td>
        </tr>);
    });


    return (
        <div className="OldGrid__grid OldGrid__centered SeasonStatsPage__statsPageContainer">
        <div className="SeasonStatsPage__top-grid">
            <div
                className="OldGrid__row OldGrid__vertical-align Title__row SeasonStatsPage__title"
                role="presentation"
            >
                <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header">
                    Stats
                </h1>
            </div>
            <div className="SeasonStatsPage__export-stats">
                <a
                    download=""
                    className="ExportStatsButton__export-stats-button"
                    target="_self"
                >
                    Export Stats
                </a>
            </div>
        </div>
        <div className="StatsTable__tab-view-grid">
            <div className="StatsTable__tab-view">
                <div className="OldGrid__row" role="presentation">
                    <div
                        data-testid="stats-view-chooser"
                        className="TabViewChooser__container"
                    >
                        <span className="Clickable__container" role="button">
                            <div
                                className="TabViewChooserItem__tabViewChooserItem TabViewChooserItem__activeTabViewChooserItem"
                                role="tab"
                            >
                                <span className="Text__text Text__left Text__gc-blue Text__small Text__semibold TabViewChooserItem__tabViewChooserLabel TabViewChooserItem__tabViewChooserLabelNoWrap">
                                    Batting
                                </span>
                            </div>
                        </span>
                        <span className="Clickable__container" role="button">
                            <div className="TabViewChooserItem__tabViewChooserItem" role="tab">
                                <span className="Text__text Text__left Text__off-black Text__small Text__semibold TabViewChooserItem__tabViewChooserLabel TabViewChooserItem__tabViewChooserLabelNoWrap">
                                    Pitching
                                </span>
                            </div>
                        </span>
                        <span className="Clickable__container" role="button">
                            <div className="TabViewChooserItem__tabViewChooserItem" role="tab">
                                <span className="Text__text Text__left Text__off-black Text__small Text__semibold TabViewChooserItem__tabViewChooserLabel TabViewChooserItem__tabViewChooserLabelNoWrap">
                                    Fielding
                                </span>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="OldGrid__row" role="presentation">
                    <div
                        data-testid="stats-selector"
                        className="TabViewChooser__selectorContainer"
                    >
                        <span className="Clickable__container" role="button">
                            <div
                                className="TabViewChooserItem__selectorItem TabViewChooserItem__activeSelectorItem"
                                role="tab"
                            >
                                <span className="Text__text Text__left Text__gc-blue Text__base Text__semibold TabViewChooserItem__tabViewChooserLabelNoWrap">
                                    Standard
                                </span>
                            </div>
                        </span>
                        <span className="Clickable__container" role="button">
                            <div className="TabViewChooserItem__selectorItem" role="tab">
                                <span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabViewChooserItem__tabViewChooserLabelNoWrap">
                                    Advanced
                                </span>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
            <div className="SeasonStatsPage__filter-stats">
                <button
                    type="button"
                    className="TextButton__medium TextButton__text-button"
                >
                    <span className="TextButton__iconAndBadge TextButton__iconAndBadge--small">
                        <svg width={24} height={24} viewBox="0 0 22 21">
                            <path
                                className="Icon__gc-blue Icon__fill"
                                d="M3.5 0v8.05C4.917 8.29 6 9.514 6 11c0 1.486-1.083 2.71-2.5 2.95V22h-1v-8.05C1.083 13.71 0 12.486 0 11c0-1.486 1.083-2.71 2.5-2.95V0h1zM11 0v2.05c1.417.24 2.5 1.464 2.5 2.95 0 1.486-1.083 2.71-2.5 2.95V22h-1V7.95C8.583 7.71 7.5 6.486 7.5 5c0-1.486 1.083-2.71 2.5-2.95V0h1zm7.476 0v14.048C19.905 14.278 21 15.506 21 17s-1.095 2.723-2.524 2.952V22h-1v-2.053C16.07 19.699 15 18.477 15 17s1.07-2.698 2.476-2.947V0h1z"
                                fillRule="nonzero"
                            />
                        </svg>
                    </span>
                    <div className="Text__text Text__left Text__gc-blue Text__small Text__bold">
                        Filter Stats
                    </div>
                </button>
            </div>
        </div>
        <div className="Spacer__spacer Spacer__md Spacer__vertical" />

        <div id="stats_container">
            <div className="statsPageContainer grid">
                <table className="gcTable statTable withGridLines withOutline withHoverHighlighting">
                    <thead>
                        <tr>
                            <th className="jerseyNumberCell header">#</th>
                            <th className="playerNameCell invertLinkUnderline strong header headerSortDown">First</th>
                            <th className="playerNameCell invertLinkUnderline strong header headerSortDown">Last</th>
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
                            <td className="footerTitleCell">Totals</td>
                            <td></td>
                            <td></td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
                            <td className="statCell">00</td>
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

export default StandardGrid;