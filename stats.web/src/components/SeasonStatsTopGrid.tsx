
function SeasonStatsTopGrid() {

    return (
        <>
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
        </>
    );

}

export default SeasonStatsTopGrid;