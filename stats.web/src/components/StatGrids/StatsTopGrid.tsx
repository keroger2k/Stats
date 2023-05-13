import FilterIcon from "../SVGImages/FilterIcon";

function StatsTopGrid({ setGrid, setGridType, grid, gridType }: { setGrid: any, setGridType: any, grid: any, gridType: any }) {

    function getButton() {
        if (grid === "Fielding") {
            return (<span className="Clickable__container" role="button" onClick={() => setGridType("Catching")}>
                <div className={getGridTypeActiveClass('Catching')} role="tab">
                    <span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabViewChooserItem__tabViewChooserLabelNoWrap">
                        Catching
                    </span>
                </div>
            </span>);
        } else {
            return (<span className="Clickable__container" role="button" onClick={() => setGridType("Advanced")}>
                <div className={getGridTypeActiveClass('Advanced')} role="tab">
                    <span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabViewChooserItem__tabViewChooserLabelNoWrap">
                        Advanced
                    </span>
                </div>
            </span>);
        }
    }

    function getGridActiveClass(type: string) {
        if (type === grid) {
            return "TabViewChooserItem__tabViewChooserItem TabViewChooserItem__activeTabViewChooserItem";
        }
        else {
            return "TabViewChooserItem__tabViewChooserItem";
        }
    }

    function getGridTypeActiveClass(type: string) {
        if (type === gridType) {
            return "TabViewChooserItem__selectorItem TabViewChooserItem__activeSelectorItem";
        }
        else {
            return "TabViewChooserItem__selectorItem";
        }
    }

    return (
        <>
            <div className="SeasonStatsPage__top-grid">
                <div className="OldGrid__row OldGrid__vertical-align Title__row SeasonStatsPage__title" role="presentation">
                    <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header">
                        Stats
                    </h1>
                </div>
                <div className="SeasonStatsPage__export-stats">
                    <a download="" className="ExportStatsButton__export-stats-button" target="_self" >
                        Export Stats
                    </a>
                </div>
            </div>
            <div className="StatsTable__tab-view-grid">
                <div className="StatsTable__tab-view">
                    <div className="OldGrid__row" role="presentation">
                        <div data-testid="stats-view-chooser" className="TabViewChooser__container" >
                            <span className="Clickable__container" role="button" onClick={() => setGrid("Batting")}>
                                <div className={ getGridActiveClass('Batting') }  role="tab">
                                    <span className="Text__text Text__left Text__gc-blue Text__small Text__semibold TabViewChooserItem__tabViewChooserLabel TabViewChooserItem__tabViewChooserLabelNoWrap">
                                        Batting
                                    </span>
                                </div>
                            </span>
                            <span className="Clickable__container" role="button">
                                <div className={getGridActiveClass('Pitching')} role="tab" onClick={() => setGrid("Pitching")}>
                                    <span className="Text__text Text__left Text__off-black Text__small Text__semibold TabViewChooserItem__tabViewChooserLabel TabViewChooserItem__tabViewChooserLabelNoWrap">
                                        Pitching
                                    </span>
                                </div>
                            </span>
                            <span className="Clickable__container" role="button">
                                <div className={getGridActiveClass('Fielding')} role="tab" onClick={() => setGrid("Fielding")}>
                                    <span className="Text__text Text__left Text__off-black Text__small Text__semibold TabViewChooserItem__tabViewChooserLabel TabViewChooserItem__tabViewChooserLabelNoWrap">
                                        Fielding
                                    </span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="OldGrid__row" role="presentation">
                        <div data-testid="stats-selector" className="TabViewChooser__selectorContainer">
                            <span className="Clickable__container" role="button">
                                <div className={getGridTypeActiveClass('Standard')} role="tab" onClick={() => setGridType("Standard")}>
                                    <span className="Text__text Text__left Text__gc-blue Text__base Text__semibold TabViewChooserItem__tabViewChooserLabelNoWrap">
                                        Standard
                                    </span>
                                </div>
                            </span>
                            { getButton() }
                        </div>
                    </div>
                </div>
                <div className="SeasonStatsPage__filter-stats">
                    <button type="button" className="TextButton__medium TextButton__text-button" disabled>
                        <span className="TextButton__iconAndBadge TextButton__iconAndBadge--small">
                            <FilterIcon></FilterIcon>
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

export default StatsTopGrid;