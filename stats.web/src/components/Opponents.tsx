import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../services/api';
import { SearchResult } from '../models/models';
import BaseballLogoLarge from './SVGImages/BaseballLogoLarge';
import './Opponents.scss';
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner"

function OpponentsContainer() {

    const [data, setData] = useState<SearchResult[]>([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();



    React.useEffect(() => {
        const services = new Service();
        if (query) {
            services.getSearchHits('Search', query).then(data => {
                setData(data);
            });
        }
    }, [query]);

    function getAvatarImage(item: SearchResult) {
        if (item.avatar_url !== null) {
            return <img className="Image__circle" src={item.avatar_url} alt="" />;
        } else {
            return <BaseballLogoLarge></BaseballLogoLarge>
        }
    }

    function importTeam(id: string) {
        const services = new Service();
        setIsLoading(true)
        services.importTeam('Teams', id).then((data) => {
            setIsLoading(false)
            navigate("/teams/" + id + "/schedule")
        });
    }


    const content = Object.entries(data).map((i, index) => {
        return (
            <div className="Grid__grid Grid__fixed Grid__grid-item OpponentListing__list" >
                <div className="Grid__grid-item" >
                    <span className="Clickable__container OpponentListing__opponentRow" role="button" >
                        <div className="Avatar__container Avatar__white-background Avatar__medium OpponentListing__avatar">
                            <div className="Avatar__centered">
                                {getAvatarImage(data[index])}
                                
                            </div>
                        </div>
                        <span className="Text__text Text__left Text__off-black Text__base Text__semibold OpponentListing__name"><span className="name">{data[index].name}</span> (<span className="season">{data[index].team_season.season}::{data[index].team_season.year}::{data[index].age_group}</span>)</span>
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular OpponentListing__details">{data[index].number_of_players} players</span>
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular OpponentListing__details location">{data[index].location?.city}, {data[index].location?.state}</span>
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular OpponentListing__details staff">{data[index].staff.join(', ')}</span>
                        <div className="OpponentListing__button">
                            <div>
                                <a className="Button__button-link" href="#">
                                    <button type="button" className="Button__small Button__gc-blue Button__stroke Button__fixed" onClick={ () => importTeam(data[index].id) }>Import</button>
                                </a>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        );
    });

    return (
        <main className="MainContent__mainContentContainer">
           
            <div className="OpponentsPageDisplay__opponentsPage">
                <div className="OpponentsPageDisplay__stickyItem StickyItem__stickyItem" data-sticky-name="Opponents" data-sticky="true" >
                    <h1 className="Text__text Text__left Text__off-black Text__xlarge Text__xbold Text__inline-header">Import New Team</h1>
                    <div className="OpponentsPageSearch__searchContainer">
                        <div className="Text__text Text__left Text__off-black Text__medium Text__bold OpponentsPageSearch__searchBarTitle">Add New Team</div>
                        <span>
                            <div className="Grid__grid Grid__fixed">
                                <div className="Grid__grid-item custom-grid" >
                                    <div className="OpponentsPageSearch__opponentSearchContainer">
                                        <label htmlFor="opponentSearch" className="OpponentsPageSearch__opponentSearch">
                                            <input
                                                onChange={(e) => setQuery(e.target.value)}
                                                type="text" className="TextInput__input" data-testid="OpponentSearchBox" name="opponentName" id="opponentName"
                                                placeholder="Find or Create Team," />
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
                </div>
                {isLoading ? <LoadingSpinner /> : content}
            </div>
        </main>
    );
}

export default OpponentsContainer;