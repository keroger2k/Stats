import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import Service from '../../services/api';
import { Team, Player, formatWeekdayShort } from '../../models/models';
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

    function formatInningsPitched(ip: number) {
        var innings = ip % 1;
        var result = "";
        if (parseFloat(innings.toFixed(2)) === .33) {
            result = parseInt(ip.toString()) + ".1"

        } else if (parseFloat(innings.toFixed(2)) === .67) {
            result = parseInt(ip.toString()) + ".2"

        } else {
            result = parseInt(ip.toString()) + ".0"
        }
        return result;
    }

    const { id } = useParams();
    const [data, setData] = useState<PitchSmartData | undefined>();
    const [team, setTeam] = useState<Team>();

    React.useEffect(() => {
        const services = new Service();
        services.getSeasonStats('teams', id).then(data => {
            setTeam(data);
        });

        services.getPitchSmart('teams', id).then(data => {
            setData(data);
        });
    }, []);


    function getContent() {
        if (data && team) {
            var content = team!.players.map((value: Player, index: number) => {
                if (team.season_stats.stats_data.players[value.id].stats.defense) {
                    return (
                        <tr>
                            <th scope="row">{`${value.first_name} ${value.last_name}, #${value.number}`}</th>
                            <td className="divider">{formatInningsPitched(team.season_stats.stats_data.players[value.id].stats.defense.ip)}</td>
                            <td>{team.season_stats.stats_data.players[value.id].stats.defense['#P']}</td>
                            <td>{(team.season_stats.stats_data.players[value.id].stats.defense['S%'] * 100).toFixed(2)}</td>
                            <td>{(team.season_stats.stats_data.players[value.id].stats.defense.bf)}</td>
                            <td>{(team.season_stats.stats_data.players[value.id].stats.defense.so)}</td>
                            <td>{team.season_stats.stats_data.players[value.id].stats.defense.bf === 0 ? "0.00" : ((team.season_stats.stats_data.players[value.id].stats.defense.so) / (team.season_stats.stats_data.players[value.id].stats.defense.bf) * 100).toFixed(2)}</td>
                            <td className="divider">{data[0][value.id] ? data[0][value.id] : "0"}</td>
                            <td>{data[1][value.id] ? data[1][value.id] : "0"}</td>
                            <td>{data[2][value.id] ? data[2][value.id] : "0"}</td>
                            <td>{data[3][value.id] ? data[3][value.id] : "0"}</td>
                            <td>{data[4][value.id] ? data[4][value.id] : "0"}</td>
                            <td>{data[5][value.id] ? data[5][value.id] : "0"}</td>
                        </tr>
                    );
                }
                return (
                    <tr>
                        <th scope="row">{`${value.first_name} ${value.last_name}, #${value.number}`}</th>
                        <td className="divider">0.0</td>
                        <td className="">0</td>
                        <td className="">0.0</td>
                        <td className="">0</td>
                        <td className="">0</td>
                        <td className="">0.0</td>
                        <td className="divider">0</td>
                        <td className="">0</td>
                        <td className="">0</td>
                        <td className="">0</td>
                        <td className="">0</td>
                        <td className="">0</td>
                    </tr>
                );
            });
            return content;
        }
        return "";
    }


    if (data) {
        return (

            <>
                <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                    <TeamNavBar {...team!} />
                </div>
                <div className="OldGrid__grid OldGrid__centered SeasonStatsPage__statsPageContainer">


                    <div className="Spacer__spacer Spacer__md Spacer__vertical" />
                    <div id="stats_container">
                        <div className="statsPageContainer grid">
                            <table className="table table-hover table-border">
                                <thead>
                                    <tr>
                                        <td scope="col">&nbsp;</td>
                                        <td className="divider" scope="col" colSpan={6} >Season Stats</td>
                                        <td className="divider" scope="col" colSpan={5} >Previous Days</td>
                                        
                                    </tr>
                                    <tr className="table-group-divider">
                                        <td scope="col">Player</td>
                                        <td className="divider" scope="col">IP</td>
                                        <td scope="col">#P</td>
                                        <td scope="col">S%</td>
                                        <td scope="col">BF</td>
                                        <td scope="col">SO</td>
                                        <td scope="col">K%</td>
                                        <td className="divider" scope="col">{formatWeekdayShort(new Date().getDay())}</td>
                                        <td scope="col">{formatWeekdayShort(new Date(new Date().setDate(new Date().getDate() - 1)).getDay())}</td>
                                        <td scope="col">{formatWeekdayShort(new Date(new Date().setDate(new Date().getDate() - 2)).getDay())}</td>
                                        <td scope="col">{formatWeekdayShort(new Date(new Date().setDate(new Date().getDate() - 3)).getDay())}</td>
                                        <td scope="col">{formatWeekdayShort(new Date(new Date().setDate(new Date().getDate() - 4)).getDay())}</td>
                                        <td scope="col">{formatWeekdayShort(new Date(new Date().setDate(new Date().getDate() - 5)).getDay())}</td>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {getContent()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>

        );
    }
    return (<h1>&nbsp;</h1>);
}

export default TeamPitchSmart;