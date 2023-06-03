import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Service from '../services/api';
import { Team, Avatar } from '../models/models';
import TeamRow from './TeamRow/TeamRow';

import './MainContainer.scss';
import BaseballLogo from './SVGImages/BaseballLogo';

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
            <TeamRow name={team.name} id={team.id}></TeamRow>
        </Link>
    );

    return (
        <div className="TeamsList__teamPageContainer">
            <div className="Grid__fullWidth Grid__grid Grid__fixed TeamsList__teamPageGrid">
                <div className="Grid__grid-item" >
                    <div className="TeamsList__teamPageHeader">
                        <div className="OldGrid__row OldGrid__vertical-align Title__row" role="presentation">
                            <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header" data-testid="teams-title">Teams <small className="text-muted small h6">({dataCopy.length})</small></h1>
                        </div>
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
                                                <BaseballLogo />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                        <div className="TeamsList__seasonContainer">
                            <span className="Clickable__container TeamsList__teamRow TeamsList__enabled" role="button" >
                                <div className="Avatar__container Avatar__white-background Avatar__medium">
                                    <div className="Avatar__centered">
                                    </div>

                                </div>
                                <div className="TeamsList__teamName">
                                    <span className="Text__text Text__left Text__off-black Text__base Text__semibold">
                                        Teams below are stored locally, to add new ones click "Add Team".
                                    </span>
                                </div>
                                <div className="TeamsList__teamGroup">
                                    <div className="TeamsList__chevron">
                                    </div>
                                </div>
                            </span>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContainer;