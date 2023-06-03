import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../../services/api';
import { Team } from '../../models/models';
import TeamNavBar from '../TeamNavBar/TeamNavBar';

import './TeamInfo.scss'


function TeamInfo() {

    const { id } = useParams();
    const [data, setData] = useState<Team | null>(null);

    React.useEffect(() => {
        const services = new Service();
        services.getSchedule('teams', id).then(data => {
            setData(data);
        });
    }, []);

    const content = data?.players.map((player) => {
        return (
            <a className="ListRow__container ListRow__listRow ListRow__oneRow" href="">
                <div className="ListRow__avatar">
                    <div className="Avatar__container Avatar__grey-background Avatar__small">
                        <div className="Avatar__centered">
                            <div className="Avatar__text"><span className="Text__text Text__left Text__white Text__small Text__bold">{`${player.first_name.substring(0, 1)}${player.last_name?.substring(0, 1) }`}</span></div>
                        </div>
                    </div>
                </div>
                <div className="ListRow__mainContent">{`${player.first_name} ${player.last_name}, #${player.number}`}</div>
                <div className="ListRow__buttons"></div>
            </a>
        );
    });

    return (

        <>
            <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                <TeamNavBar {...data!} />
            </div>
            <div className="OldGrid__grid OldGrid__centered TeamInfoPage__teamInfoPageContainer">
                <div className="OldGrid__row OldGrid__vertical-align Title__row" role="presentation">
                    <h1 className="Text__text Text__left Text__off-black Text__base Text__xbold Title__text Text__inline-header">Team</h1>
                </div>
                <div className="OldGrid__row TeamInfoPage__view-selector" role="presentation">
                    <div data-testid="stats-selector" className="TabViewChooser__selectorContainer">
                        <span className="Clickable__container" role="button">
                            <div className="TabViewChooserItem__selectorItem TabViewChooserItem__activeSelectorItem" role="tab">
                                <span className="Text__text Text__left Text__gc-blue Text__base Text__semibold TabViewChooserItem__tabViewChooserLabelNoWrap">Roster</span>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="ListRow__listRowContainer">
                    { content }
                </div>
                <span></span>
            </div>
        </>

    );
}

export default TeamInfo;