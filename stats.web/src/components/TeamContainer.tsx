
function TeamContainer() {

    return (
        <main className="MainContent__mainContentContainer">
            <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                <div className="TeamNavBar__navBar">
                    <div className="TeamInfoSection__teamInfo" data-testid="TeamInfoSection">
                        <div className="Avatar__container Avatar__white-background Avatar__large TeamInfoSection__teamAvatar TeamInfoSection__teamCustomAvatar">
                            <div className="Avatar__centered">
                            {/*    <img className="Image__circle" src="" alt="">*/}
                            </div>
                            <div className="Avatar__sport-accessory Avatar__white-background Avatar__small-border">
                                <svg width="24" height="24" viewBox="0 0 24 24" data-testid="icon-baseball" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Baseball" fill="none" fill-rule="evenodd">
                                        <path d="M0 0h24v24H0z"></path>
                                        <g fill-rule="nonzero">
                                            <path d="M19.778 19.778c4.296-4.296 4.296-11.26 0-15.556-4.296-4.296-11.26-4.296-15.556 0-4.296 4.296-4.296 11.26 0 15.556 4.296 4.296 11.26 4.296 15.556 0zM5.636 18.364a9 9 0 1 1 .21.203l-.21-.203z" fill="#0A0B0D"></path>
                                            <path d="M22.644 12.68A8.038 8.038 0 0 1 11.32 1.355l1.53 1.29a6.038 6.038 0 0 0 8.505 8.506l1.29 1.53zM9.565 21.504a9.209 9.209 0 0 0-2.5-4.57 9.209 9.209 0 0 0-4.57-2.5l.425-1.953a11.209 11.209 0 0 1 5.56 3.04 11.209 11.209 0 0 1 3.04 5.559l-1.955.424z" fill="#FF4054"></path>
                                            <path d="M19.778 19.778c4.296-4.296 4.296-11.26 0-15.556-4.296-4.296-11.26-4.296-15.556 0-4.296 4.296-4.296 11.26 0 15.556 4.296 4.296 11.26 4.296 15.556 0zM5.636 18.364a9 9 0 1 1 .21.203l-.21-.203z" fill="#0A0B0D"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="TeamInfoSection__teamText">
                            <div className="TeamInfoSection__teamNameContainer"><span className="Text__text Text__left Text__off-black Text__base Text__xbold TeamInfoSection__teamName">Pony Express Blue 13U</span></div>
                            <div className="TeamInfoSection__teamSeasonLocation" data-testid="TeamInfoSection-SeasonRecordAndName"><span className="Text__text Text__left Text__cool-grey-dark Text__small Text__bold">11-4-1</span><span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular"> • Spring 2023</span><span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular" title="Bloomington, IL, United States"> • Bloomington, IL, United States</span></div>
                        </div>
                    </div>
                    <div className="TabNavBar__tabItems">
                        <a data-testid="team-nav-bar-schedule" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/schedule">
                            <div className="TabNavBarItem__tabNavBarItem TabNavBarItem__activeTabNavBarItem" role="tab"><span className="Text__text Text__left Text__gc-blue Text__base Text__bold TabNavBarItem__tabNavBarLabel">Schedule</span></div>
                            <div className="TabNavBarItem__activeTabItemUnderline"></div>
                        </a>
                        <a data-testid="team-nav-bar-team" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/teamInfo">
                            <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Team</span></div>
                            <div className=""></div>
                        </a>
                        <a data-testid="team-nav-bar-stats" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/season-stats">
                            <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Stats</span></div>
                            <div className=""></div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="Grid__grid Grid__fixed ScheduleListContainer__schedulePageContainer">
                <div className="Grid__grid-item ScheduleListContainer__scheduleHeader" >
                    <div className="OldGrid__row OldGrid__vertical-align Title__row ScheduleListContainer__scheduleHeaderRow" role="presentation">
                        <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header">Schedule</h1>
                        <button type="button" className="Button__large Button__gc-blue Button__filled Button__fixed" data-testid="add-event-button"><span className="Text__text Text__left Text__white Text__base Text__bold">Update Team Data</span></button>
                    </div>
                </div>
                <div className="Grid__grid-item" >
                    <div className="Grid__grid-item" >
                        <div className="ScheduleSection__section ScheduleListByMonth__eventMonth">
                            <div className="ScheduleListByMonth__dayRow">
                                <div className="ScheduleListByMonth__dayDate">
                                    <div className="Text__text Text__center Text__cool-grey-dark Text__small Text__regular">MON</div>
                                    <div className="Text__text Text__center Text__off-black Text__base Text__xbold ScheduleListByMonth__dateText">16</div>
                                </div>
                                <div>
                                    <a className="ScheduleListByMonth__event" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/schedule/2969c2c6-36a5-46d2-8b60-089d08462928">
                                        <div className="ScheduleListByMonth__title">
                                            <div className="ScheduleListByMonth__eventIndicators"></div>
                                            <div className="Text__text Text__left Text__off-black Text__base Text__semibold">Practice</div>
                                        </div>
                                        <div className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular ScheduleListByMonth__location">at Double Play</div>
                                        <div className="ScheduleListByMonth__scoreOrTime">
                                            <span className="Text__text Text__left Text__off-black Text__base Text__regular ScheduleListByMonth__time ScheduleListByMonth__scoreOrTimeText">6:00 PM</span>
                                            <span className="ScheduleListByMonth__chevron">
                                                <svg  width="16" height="16" viewBox="0 0 14 14" data-testid="icon-chevron">
                                                    <path className="Icon__cool-grey-dark Icon__fill" d="M1.079 13c-.277 0-.553-.106-.763-.317-.421-.424-.421-1.109 0-1.532L4.949 6.5.316 1.848C-.105 1.426-.105.741.316.318c.421-.424 1.104-.424 1.526 0L8 6.5l-6.158 6.183c-.21.21-.487.317-.763.317" fill-rule="evenodd"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="ScheduleListByMonth__dayRow">
                                <div className="ScheduleListByMonth__dayDate">
                                    <div className="Text__text Text__center Text__cool-grey-dark Text__small Text__regular">MON</div>
                                    <div className="Text__text Text__center Text__off-black Text__base Text__xbold ScheduleListByMonth__dateText">23</div>
                                </div>
                                <div>
                                    <a className="ScheduleListByMonth__event" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/schedule/210c9d54-a63e-4e80-abcd-84b71a0e2cc7">
                                        <div className="ScheduleListByMonth__title">
                                            <div className="ScheduleListByMonth__eventIndicators"></div>
                                            <div className="Text__text Text__left Text__off-black Text__base Text__semibold">Practice</div>
                                        </div>
                                        <div className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular ScheduleListByMonth__location">at Double Play</div>
                                        <div className="ScheduleListByMonth__scoreOrTime">
                                            <span className="Text__text Text__left Text__off-black Text__base Text__regular ScheduleListByMonth__time ScheduleListByMonth__scoreOrTimeText">6:00 PM</span>
                                            <span className="ScheduleListByMonth__chevron">
                                                <svg  width="16" height="16" viewBox="0 0 14 14" data-testid="icon-chevron">
                                                    <path className="Icon__cool-grey-dark Icon__fill" d="M1.079 13c-.277 0-.553-.106-.763-.317-.421-.424-.421-1.109 0-1.532L4.949 6.5.316 1.848C-.105 1.426-.105.741.316.318c.421-.424 1.104-.424 1.526 0L8 6.5l-6.158 6.183c-.21.21-.487.317-.763.317" fill-rule="evenodd"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="ScheduleListByMonth__dayRow">
                                <div className="ScheduleListByMonth__dayDate">
                                    <div className="Text__text Text__center Text__cool-grey-dark Text__small Text__regular">MON</div>
                                    <div className="Text__text Text__center Text__off-black Text__base Text__xbold ScheduleListByMonth__dateText">30</div>
                                </div>
                                <div>
                                    <a className="ScheduleListByMonth__event" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/schedule/0a6f2b7c-c3d5-4a58-a22a-bb19f4f030e4">
                                        <div className="ScheduleListByMonth__title">
                                            <div className="ScheduleListByMonth__eventIndicators"></div>
                                            <div className="Text__text Text__left Text__off-black Text__base Text__semibold">Practice</div>
                                        </div>
                                        <div className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular ScheduleListByMonth__location">at Double Play</div>
                                        <div className="ScheduleListByMonth__scoreOrTime">
                                            <span className="Text__text Text__left Text__off-black Text__base Text__regular ScheduleListByMonth__time ScheduleListByMonth__scoreOrTimeText">6:00 PM</span>
                                            <span className="ScheduleListByMonth__chevron">
                                                <svg  width="16" height="16" viewBox="0 0 14 14" data-testid="icon-chevron">
                                                    <path className="Icon__cool-grey-dark Icon__fill" d="M1.079 13c-.277 0-.553-.106-.763-.317-.421-.424-.421-1.109 0-1.532L4.949 6.5.316 1.848C-.105 1.426-.105.741.316.318c.421-.424 1.104-.424 1.526 0L8 6.5l-6.158 6.183c-.21.21-.487.317-.763.317" fill-rule="evenodd"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default TeamContainer;