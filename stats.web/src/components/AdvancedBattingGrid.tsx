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
            <td className="statCell">{ (team.season_stats.stats_data.players[player].stats.offense["C%"] * 100).toFixed(2)}</td>
            <td className="statCell">{team.season_stats.stats_data.players[player].stats.offense.hard}</td>
            <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["LND%"] * 100).toFixed(2)}</td>
            <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["FLB%"] * 100).toFixed(2)}</td>
            <td className="statCell">{(team.season_stats.stats_data.players[player].stats.offense["GB%"]  * 100).toFixed(2)}</td>
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
                            { content }
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
                                <td className="statCell">{ (team.season_stats.stats_data.stats.offense["C%"] * 100).toFixed(2) }</td>
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
            <div className="StatsLegend__legendRow" data-testid="stats-legend"><dl><dt>GP</dt><dd>Games played</dd><dt>PA</dt><dd>Plate appearances</dd><dt>AB</dt><dd>At bats</dd><dt>QAB</dt><dd>Quality at bats (any one of: 3 pitches after 2 strikes, 6+ pitch ABs, XBH, HHB, BB, SAC Bunt, SAC Fly)</dd><dt>QAB%</dt><dd>Quality at bats per plate appearance</dd><dt>PA/BB</dt><dd>Plate appearances per walk</dd><dt>BB/K</dt><dd>Walks per strikeout</dd><dt>C%</dt><dd>Contact percentage/Contact rate: AB-K/AB</dd><dt>HHB</dt><dd>Hard hit balls: Total line drives and hard ground balls</dd><dt>LD%</dt><dd>Line drive percentage</dd><dt>FB%</dt><dd>Fly ball percentage</dd><dt>GB%</dt><dd>Ground ball percentage</dd><dt>BABIP</dt><dd>Batting average on balls in play</dd><dt>BA/RISP</dt><dd>Batting average with runners in scoring position</dd></dl><dl><dt>LOB</dt><dd>Runners left on base</dd><dt>2OUTRBI</dt><dd>2-out RBI</dd><dt>XBH</dt><dd>Extra-base hits</dd><dt>TB</dt><dd>Total bases</dd><dt>PS</dt><dd>Pitches seen</dd><dt>PS/PA</dt><dd>Pitches seen per plate appearance</dd><dt>2S+3</dt><dd>Plate appearances in which batter sees 3+ pitches after 2 strikes</dd><dt>2S+3%</dt><dd>% of plate appearances in which batter sees 3+ pitches after 2 strikes</dd><dt>6+</dt><dd>Plate appearances with 6+ pitches</dd><dt>6+%</dt><dd>% of plate appearances of 6+ pitches</dd><dt>AB/HR</dt><dd>At bats per home run</dd><dt>GIDP</dt><dd>Hit into double play</dd><dt>GITP</dt><dd>Hit into triple play</dd><dt>CI</dt><dd>Batter advances on catcher's interference</dd></dl></div>
    </div>
    );

}

export default AdvancedBattingGrid;