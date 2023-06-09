import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Service from '../services/api';
import { SearchResult } from '../models/models';
import BaseballLogoLarge from './SVGImages/BaseballLogoLarge';
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner"
import SearchBox from './SearchBox/SearchBox';
import './Opponents.scss';

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
                                    <button type="button" className="Button__small Button__gc-blue Button__stroke Button__fixed" onClick={() => importTeam(data[index].id)}>Import</button>
                                </a>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        );
    });

    return (
        <div className="OpponentsPageDisplay__opponentsPage">
            <div className="OpponentsPageDisplay__stickyItem StickyItem__stickyItem" data-sticky-name="Opponents" data-sticky="true" >
                <h1 className="Text__text Text__left Text__off-black Text__xlarge Text__xbold Text__inline-header">Import New Team</h1>
                <div className="OpponentsPageSearch__searchContainer">
                    <div className="Text__text Text__left Text__off-black Text__medium Text__bold OpponentsPageSearch__searchBarTitle">Add New Team</div>
                    <SearchBox setQuery={setQuery} />
                </div>
            </div>
            {isLoading ? <LoadingSpinner /> : content}
        </div>
    );
}

export default OpponentsContainer;