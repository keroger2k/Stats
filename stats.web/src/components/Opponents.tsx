import React, { useState } from 'react';
import Service from '../services/api';
import './MainContainer.scss';
import { SearchResult } from '../models/models';
import BaseballLogoLarge from './SVGImages/BaseballLogoLarge';

function OpponentsContainer() {

    const [data, setData] = useState<SearchResult[]>([]);
    const [query, setQuery] = useState("");


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
        services.importTeam('Teams', id);
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
                        <span className="Text__text Text__left Text__off-black Text__base Text__semibold OpponentListing__name">{data[index].name}</span>
                        <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular OpponentListing__details">{data[index].number_of_players} players</span>
                        <div className="OpponentListing__button">
                            <div>
                                <a className="Button__button-link" href="/">
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
                        <div className="Text__text Text__left Text__off-black Text__medium Text__bold OpponentsPageSearch__searchBarTitle">Add New Opponent</div>
                        <span>
                            <div className="Grid__grid Grid__fixed">
                                <div className="Grid__grid-item custom-grid" >
                                    <div className="OpponentsPageSearch__opponentSearchContainer">
                                        <label htmlFor="opponentSearch" className="OpponentsPageSearch__opponentSearch">
                                            <input
                                                onChange={(e) => setQuery(e.target.value)}
                                                type="text" className="TextInput__input" data-testid="OpponentSearchBox" name="opponentName" id="opponentName"
                                                placeholder="Find or Create Opponent" />
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
                                <div className="Grid__grid-item custom-grid">
                                    <div className="OpponentsPageSearch__filterContainer">
                                        <div className="Grid__grid Grid__fixed">
                                            <div className="Grid__grid-item OpponentsPageSearch__filterByContainer custom-grid-item2" >
                                                <label htmlFor="seasonSelector" className="OpponentsPageSearch__filterBy"><span>Filter by</span></label>
                                            </div>
                                            <div className="Grid__grid-item OpponentsPageSearch__cityStatePickerGridItem custom-grid-item5" >
                                                <div className="OpponentsPageSearch__cityStatePickerDropdown">
                                                    <span>
                                                        <span><input type="text" className="TextInput__input" id="locationFilter" placeholder="City" value="" /></span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="Grid__grid-item OpponentsPageSearch__seasonSelectorGridItem custom-grid-item5" >
                                                <select className="Select__select" id="seasonSelector" name="seasonFilter" placeholder="Select Season">
                                                    <option value="{}" label="Select Season">Select Season</option>
                                                    <option value='{"season":"summer","year":2024}' label="Summer 2024">Summer 2024</option>
                                                    <option value='{"season":"spring","year":2024}' label="Spring 2024">Spring 2024</option>
                                                    <option value='{"season":"winter","year":2023}' label="Winter 2023-2024">Winter 2023-2024</option>
                                                    <option value='{"season":"fall","year":2023}' label="Fall 2023">Fall 2023</option>
                                                    <option value='{"season":"summer","year":2023}' label="Summer 2023">Summer 2023</option>
                                                    <option value='{"season":"spring","year":2023}' label="Spring 2023">Spring 2023</option>
                                                    <option value='{"season":"winter","year":2022}' label="Winter 2022-2023">Winter 2022-2023</option>
                                                    <option value='{"season":"fall","year":2022}' label="Fall 2022">Fall 2022</option>
                                                    <option value='{"season":"summer","year":2022}' label="Summer 2022">Summer 2022</option>
                                                    <option value='{"season":"spring","year":2022}' label="Spring 2022">Spring 2022</option>
                                                    <option value='{"season":"winter","year":2021}' label="Winter 2021-2022">Winter 2021-2022</option>
                                                    <option value='{"season":"fall","year":2021}' label="Fall 2021">Fall 2021</option>
                                                    <option value='{"season":"summer","year":2021}' label="Summer 2021">Summer 2021</option>
                                                    <option value='{"season":"spring","year":2021}' label="Spring 2021">Spring 2021</option>
                                                    <option value='{"season":"winter","year":2020}' label="Winter 2020-2021">Winter 2020-2021</option>
                                                    <option value='{"season":"fall","year":2020}' label="Fall 2020">Fall 2020</option>
                                                    <option value='{"season":"summer","year":2020}' label="Summer 2020">Summer 2020</option>
                                                    <option value='{"season":"spring","year":2020}' label="Spring 2020">Spring 2020</option>
                                                    <option value='{"season":"winter","year":2019}' label="Winter 2019-2020">Winter 2019-2020</option>
                                                    <option value='{"season":"fall","year":2019}' label="Fall 2019">Fall 2019</option>
                                                    <option value='{"season":"summer","year":2019}' label="Summer 2019">Summer 2019</option>
                                                    <option value='{"season":"spring","year":2019}' label="Spring 2019">Spring 2019</option>
                                                    <option value='{"year":-1}' label="All Seasons Before 2019">All Seasons Before 2019</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
                { content }
               
            </div>

        </main>
    );
}

export default OpponentsContainer;