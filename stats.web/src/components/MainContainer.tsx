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
    const [dataCopy, setDataCopy] = useState<Team[]>([]);


    React.useEffect(() => {
        const services = new Service();
        services.get('teams').then(data => {
            setData(data);
            setDataCopy(data);
        });
    }, []);

    function handleSearch(q: string) {
        setDataCopy((item: Team[]) => item = data);
        if (q !== "") {
            var filtered = data.filter((item: Team) => item.name.toLowerCase().includes(q.toLowerCase()));
            setDataCopy(filtered);
        } 
    }

    const content = dataCopy.map((team) =>
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
                            <div className="TeamsList__seasonHeader">
                                <span>
                                    <div className="Grid__grid Grid__fixed">
                                        <div className="Grid__grid-item custom-grid" >
                                            <div className="OpponentsPageSearch__opponentSearchContainer">
                                                <label htmlFor="opponentSearch" className="OpponentsPageSearch__opponentSearch">
                                                    <input
                                                        onChange={(e) => handleSearch(e.target.value)}
                                                        type="text" className="TextInput__input" data-testid="OpponentSearchBox" name="opponentName" id="opponentName"
                                                        placeholder="Find Team in Db" />
                                                </label>
                                                <span className="OpponentsPageSearch__opponentSearchIcon">
                                                    <svg width="16" height="16" viewBox="0 0 20 20">
                                                        <path
                                                            className="Icon__gc-blue Icon__fill"
                                                            d="M8.295 2.448c-3.224 0-5.847 2.623-5.847 5.847 0 3.223 2.623 5.845 5.847 5.845s5.846-2.622 5.846-5.845c0-3.224-2.622-5.847-5.846-5.847m0-1.948c4.298 0 7.795 3.497 7.795 7.795 0 1.799-.612 3.457-1.64 4.777l4.765 4.765c.38.38.38.997 0 1.378-.19.19-.44.285-.69.285-.248 0-.497-.095-.688-.285l-4.764-4.765c-1.32 1.027-2.979 1.64-4.778 1.64C3.997 16.09.5 12.593.5 8.295S3.997.5 8.295.5z"
                                                        ></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </div>
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