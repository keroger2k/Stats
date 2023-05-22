import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../../services/api';
import { Team, Player } from '../../models/models';
import './TeamPitchSmart.scss'
import TeamNavBar from '../TeamNavBar/TeamNavBar';

export interface PitchSmartData {
    [key: number]: PlayerCount;
}

export interface PlayerCount {
    [key: string]: number;
}

function TeamPitchSmart() {

    function getPlayer(id: string) {
        return team?.players.find((player: Player) => player.id === id);
    }

    const { id } = useParams();
    const [data, setData] = useState<PitchSmartData | undefined>();
    const [team, setTeam] = useState<Team>();

    React.useEffect(() => {
        const services = new Service();
        services.getSchedule('teams', id).then(data => {
            setTeam(data);
        });

        services.getPitchSmart('teams', id).then(data => {
            setData(data);
        });
    }, []);


    function getContent() {
        if (data) {
            var content = team!.players.map((value: Player, index: number) => {
                return (
                    <tr className="whiteRow odd">
                        <td className="statCell">{value.first_name}</td>
                        <td className="statCell">{data[0][value.id] ? data[0][value.id] : "0" }</td>
                        <td className="statCell">{data[1][value.id] ? data[1][value.id] : "0" }</td>
                        <td className="statCell">{data[2][value.id] ? data[2][value.id] : "0" }</td>
                        <td className="statCell">{data[3][value.id] ? data[3][value.id] : "0"}</td>
                        <td className="statCell">{data[4][value.id] ? data[4][value.id] : "0"}</td>
                    </tr>
                );
            });
            return content;
        }
        return "";
    }


    if (data) {
        return (

            <main className="MainContent__mainContentContainer">
                <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                    <TeamNavBar {...team!} />
                </div>
                <div className="OldGrid__grid OldGrid__centered SeasonStatsPage__statsPageContainer">


                    <div className="Spacer__spacer Spacer__md Spacer__vertical" />
                    <div id="stats_container">
                        <div className="statsPageContainer grid">
                            <table className="gcTable statTable withGridLines withOutline withHoverHighlighting">
                                <thead>
                                    <tr>
                                        <td className="playerNameCell invertLinkUnderline strong header">Player</td>
                                        <td className="statCell header">Today</td>
                                        <td className="statCell header">Today - 1</td>
                                        <td className="statCell header">Today - 2</td>
                                        <td className="statCell header">Today - 3</td>
                                        <td className="statCell header">Today - 4</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getContent()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

        );
    }
    return (<h1></h1>);
}

export default TeamPitchSmart;