import BaseballLogo from './SVGImages/BaseballLogo';
import Chevron from './SVGImages/Chevron';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Service from '../services/api';
import { Team } from '../models/models';
import BaseballLogoLarge from './SVGImages/BaseballLogo';

import './MainContainer.scss';

function MainContainer() {
    const [data, setData] = useState<Team[]>([]);



    React.useEffect(() => {
        const services = new Service();

        services.get('teams').then(data => setData(data));
    }, []);

    const content = data.map((team) =>
        <Link to={`/teams/${team.id}/schedule`} key={team.id} >
            <span className="Clickable__container TeamsList__teamRow TeamsList__enabled" role="button" >
                <div className="Avatar__container Avatar__white-background Avatar__medium">
                    <div className="Avatar__centered">
                        <BaseballLogoLarge></BaseballLogoLarge>
                    </div>
                    
                </div>
                <div className="TeamsList__teamName">
                    <span className="Text__text Text__left Text__off-black Text__base Text__semibold">
                        {team.name}
                    </span>
                </div>
                <div className="TeamsList__teamGroup">
                    <div className="TeamsList__chevron">
                        <Chevron></Chevron>
                    </div>
                </div>
            </span>
        </Link>
    );



    return (
        <main className="MainContent__mainContentContainer">
            <div className="TeamsList__teamPageContainer">
                <div className="Grid__fullWidth Grid__grid Grid__fixed TeamsList__teamPageGrid">
                    <div className="Grid__grid-item" >
                        <div className="TeamsList__teamPageHeader">
                            <div className="OldGrid__row OldGrid__vertical-align Title__row" role="presentation">
                                <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header" data-testid="teams-title">Teams</h1>
                            </div>
                            <Link to={`/teams/opponents`}>
                                <button type="button" className="Button__large Button__gc-blue Button__filled Button__fixed" data-testid="add-event-button">
                                    <span className="Text__text Text__left Text__white Text__base Text__bold Add_Team">Add Team</span>
                                </button>
                            </Link>
                        </div>
                        <div className="TeamsList__teamListContainer">
                            <div className="TeamsList__seasonHeader"><span className="Text__text Text__left Text__off-black Text__base Text__xbold">Spring 2023</span></div>
                            <div className="TeamsList__seasonContainer">
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainContainer;