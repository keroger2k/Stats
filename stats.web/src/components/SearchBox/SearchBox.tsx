import MagnifyIcon from "../SVGImages/Magnify";
export interface SearchProps {
    setQuery(arg: string): void;
}

export const SearchBox = ({ setQuery }: SearchProps) => {
    return (
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
                            <MagnifyIcon />
                        </span>
                    </div>
                </div>
            </div>
        </span>
    );
}

export default SearchBox;