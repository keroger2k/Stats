import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../services/api';
import { Team } from '../models/models';
import './TeamScheduleContainer.scss'
import TeamNavBar from './TeamNavBar';



function TeamSeasonContainer() {

    const { id } = useParams();
    const [data, setData] = useState<Team | null>(null);

    React.useEffect(() => {
        const services = new Service();
        services.getSchedule('teams', id).then(data => {
            setData(data);
        });
    }, []);

    return (

        <main className="MainContent__mainContentContainer">
            <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                <TeamNavBar {...data!} />
            </div>
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
                            download="Pony Express Blue 13U Spring 2023 Stats.csv"
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
                <h1>Table</h1>
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





        </main>

    );
}

export default TeamSeasonContainer;