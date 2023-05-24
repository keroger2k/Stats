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
                return (
                    <tr className="whiteRow odd">
                        <td className="statCell">{value.first_name} {value.last_name}</td>
                        <td className="statCell">{formatInningsPitched(team.season_stats.stats_data.players[value.id].stats.defense.ip)}</td>
                        <td className="statCell">{team.season_stats.stats_data.players[value.id].stats.defense['#P']}</td>
                        <td className="statCell">{(team.season_stats.stats_data.players[value.id].stats.defense['S%'] * 100).toFixed(2)}</td>
                        <td className="statCell">{(team.season_stats.stats_data.players[value.id].stats.defense.bf)}</td>
                        <td className="statCell">{(team.season_stats.stats_data.players[value.id].stats.defense.so)}</td>
                        <td className="statCell">{((team.season_stats.stats_data.players[value.id].stats.defense.so) / (team.season_stats.stats_data.players[value.id].stats.defense.bf) * 100).toFixed(2)}</td>
                        <td className="statCell">{data[0][value.id] ? data[0][value.id] : "0"}</td>
                        <td className="statCell">{data[1][value.id] ? data[1][value.id] : "0"}</td>
                        <td className="statCell">{data[2][value.id] ? data[2][value.id] : "0"}</td>
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
                                        <td className="statCell header">&nbsp;</td>
                                        <td className="statCell header"  colSpan={5} >Season Stats</td>
                                        <td className="statCell header"  colSpan={5} >Previous Days</td>
                                        
                                    </tr>
                                    <tr>
                                        <td className="playerNameCell invertLinkUnderline strong header">Player</td>
                                        <td className="statCell header">IP</td>
                                        <td className="statCell header">#P</td>
                                        <td className="statCell header">S%</td>
                                        <td className="statCell header">BF</td>
                                        <td className="statCell header">SO</td>
                                        <td className="statCell header">K%</td>
                                        <td className="statCell header">0</td>
                                        <td className="statCell header">-1</td>
                                        <td className="statCell header">-2</td>
                                        <td className="statCell header">-3</td>
                                        <td className="statCell header">-4</td>
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