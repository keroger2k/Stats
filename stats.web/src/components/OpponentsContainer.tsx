import React, { useState } from 'react';
import Service from '../services/api';
import './MainContainer.scss';
import { Team } from '../models/models';
import TeamNavBar from './TeamNavBar';
import { useParams } from "react-router-dom";

function OpponentsContainer() {

    const { id } = useParams();
    const [data, setData] = useState<Team | null>(null);

    React.useEffect(() => {
        const services = new Service();
        services.getSchedule('teams', id).then(data => {
            setData(data);
        });
    }, []);

    return (
        <main className="MainContent__mainContentContainer">
            <div className="TeamNavBar__stickyItem StickyItem__stickyItem" data-sticky-name="TeamNavbar" data-sticky="true" >
                <TeamNavBar {...data!} />
            </div>
            <div className="OpponentsPageDisplay__opponentsPage">
                <div className="OpponentsPageDisplay__stickyItem StickyItem__stickyItem" data-sticky-name="Opponents" data-sticky="true" >
                    <h1 className="Text__text Text__left Text__off-black Text__xlarge Text__xbold Text__inline-header">Opponents</h1>
                    <div className="OpponentsPageSearch__searchContainer">
                        <div className="Text__text Text__left Text__off-black Text__medium Text__bold OpponentsPageSearch__searchBarTitle">Add New Opponent</div>
                        <span>
                            <div className="Grid__grid Grid__fixed">
                                <div className="Grid__grid-item custom-grid" >
                                    <div className="OpponentsPageSearch__opponentSearchContainer">
                                        <label htmlFor="opponentSearch" className="OpponentsPageSearch__opponentSearch">
                                            <input type="text" className="TextInput__input" data-testid="OpponentSearchBox" name="opponentName" id="opponentName" placeholder="Find or Create Opponent" value="" />
                                        </label>
                                        <span className="OpponentsPageSearch__opponentSearchIcon">
                                            <svg  width="16" height="16" viewBox="0 0 20 20">
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
                <div className="Grid__grid Grid__fixed Grid__grid-item OpponentListing__list" >
                    <div className="Grid__grid-item" >
                        <span className="Clickable__container OpponentListing__opponentRow" role="button" >
                            <div className="Avatar__container Avatar__white-background Avatar__medium OpponentListing__avatar">
                                <div className="Avatar__centered">
                                    <svg width="32" height="32" viewBox="0 0 24 24" data-testid="icon-baseball" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Baseball" fill="none" fill-rule="evenodd">
                                            <path d="M0 0h24v24H0z"></path>
                                            <g fill-rule="nonzero">
                                                <path
                                                    d="M19.778 19.778c4.296-4.296 4.296-11.26 0-15.556-4.296-4.296-11.26-4.296-15.556 0-4.296 4.296-4.296 11.26 0 15.556 4.296 4.296 11.26 4.296 15.556 0zM5.636 18.364a9 9 0 1 1 .21.203l-.21-.203z"
                                                    fill="#0A0B0D"
                                                ></path>
                                                <path
                                                    d="M22.644 12.68A8.038 8.038 0 0 1 11.32 1.355l1.53 1.29a6.038 6.038 0 0 0 8.505 8.506l1.29 1.53zM9.565 21.504a9.209 9.209 0 0 0-2.5-4.57 9.209 9.209 0 0 0-4.57-2.5l.425-1.953a11.209 11.209 0 0 1 5.56 3.04 11.209 11.209 0 0 1 3.04 5.559l-1.955.424z"
                                                    fill="#FF4054"
                                                ></path>
                                                <path
                                                    d="M19.778 19.778c4.296-4.296 4.296-11.26 0-15.556-4.296-4.296-11.26-4.296-15.556 0-4.296 4.296-4.296 11.26 0 15.556 4.296 4.296 11.26 4.296 15.556 0zM5.636 18.364a9 9 0 1 1 .21.203l-.21-.203z"
                                                    fill="#0A0B0D"
                                                ></path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <span className="Text__text Text__left Text__off-black Text__base Text__semibold OpponentListing__name">13/14U Christian Center Red 14U</span>
                            <span className="Text__text Text__left Text__cool-grey-dark Text__small Text__regular OpponentListing__details">0 players</span>
                            <div className="OpponentListing__button">
                                <div>
                                    <a className="Button__button-link" href="/teams/gVmCNqvYZdFp/2023-spring-pony-express-blue-13u/opponents/2c53f774-c83c-4419-88fe-65c01dae4843/roster/add-player">
                                        <button type="button" className="Button__small Button__gc-blue Button__stroke Button__fixed">Add Roster</button>
                                    </a>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default OpponentsContainer;