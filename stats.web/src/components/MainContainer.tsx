import BaseballLogo from './BaseballLogo';
import Chevron from './Chevron';
import React, { useState } from 'react';
import Service from '../services/api';
import './MainContainer.scss';

function MainContainer() {

    const services = new Service();
    const [data, setData] = useState<any[]>([]);

    React.useEffect(() => {
        services.get('teams').then(data => setData(data));
    }, []);

    const content = data.map((team) =>
        <span className="Clickable__container TeamsList__teamRow TeamsList__enabled" role="button" >
            <div className="Avatar__container Avatar__white-background Avatar__medium">
                <div className="Avatar__centered">
                    <img
                        className="Image__circle"
                        src={team.team_avatar_image}
                        alt=""
                    />
                </div>
                <div className="Avatar__sport-accessory Avatar__white-background Avatar__xsmall-border">
                    <BaseballLogo></BaseballLogo>
                </div>
            </div>
            <div className="TeamsList__teamName"><span className="Text__text Text__left Text__off-black Text__base Text__semibold">{team.name}</span></div>
            <div className="TeamsList__teamGroup">
                <div className="TeamsList__chevron">
                    <Chevron></Chevron>
                </div>
            </div>
        </span>
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
                </div>
                <div className="TeamsList__teamListContainer">
                    <div className="TeamsList_seasonHeader"><span className="Text__text Text__left Text__off-black Text__base Text__xbold">Spring 2023</span></div>
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