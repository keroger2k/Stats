import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Service from '../services/api';
import { Team } from '../models/models';
import TeamRow from './TeamRow/TeamRow';
import BaseballLogo from './SVGImages/BaseballLogo';

import './MainContainer.scss';
import MagnifyIcon from './SVGImages/Magnify';
import SearchBox from './SearchBox/SearchBox';

function MainContainer() {
    const [data, setData] = useState<Team[]>([]);
    const [dataCopy, setDataCopy] = useState<Team[]>([]);

    React.useEffect(() => {
        const services = new Service();
        services.get('teams').then((data: Team[]) => {
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
                            <SearchBox setQuery={handleSearch} />
                        </div>
                        <div className="TeamsList__seasonContainer">
                            <span className="TeamsList__teamRow TeamsList__disabled" >
                                <div className="Avatar__container Avatar__white-background Avatar__medium">
                                    <div className="Avatar__centered">
                                        <img src={`${process.env.REACT_APP_API_URL}/teams/11111111-1111-1111-1111-111111111111/avatar`} alt="" className="Image__circle" />
                                    </div>
                                </div>
                                <div className="TeamsList__teamName">
                                    <span className="Text__text Text__left Text__off-black Text__base Text__semibold">
                                        Teams below are stored locally, to add new ones click "Add Team".
                                    </span>
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