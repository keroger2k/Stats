import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../services/api';
import { Team } from '../models/models';
import './TeamScheduleContainer.scss'
import TeamNavBar from './TeamNavBar';

function TeamInfoContainer() {

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
            <div className="Grid__grid Grid__fixed ScheduleListContainer__schedulePageContainer">
                <div className="Grid__grid-item ScheduleListContainer__scheduleHeader" >
                    <div className="OldGrid__row OldGrid__vertical-align Title__row ScheduleListContainer__scheduleHeaderRow" role="presentation">
                        <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header">Schedule</h1>
                        <button type="button" className="Button__large Button__gc-blue Button__filled Button__fixed" data-testid="add-event-button">
                            <span className="Text__text Text__left Text__white Text__base Text__bold">Update Team Data</span>
                        </button>
                    </div>
                </div>
                <br />
                <div className="Grid__grid-item" >
                    <div className="Grid__grid-item" >
                        <div className="ScheduleSection__section ScheduleListByMonth__eventMonth">
                            <h1>Team Info</h1>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default TeamInfoContainer;