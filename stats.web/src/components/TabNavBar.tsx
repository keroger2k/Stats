import { } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Team } from "../models/models";

function TabNavBar(team: Team) {

    return (
        <div className="TabNavBar__tabItems">
            <Link to={`/teams/${team.id}/schedule`}>
                <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Schedule</span></div>
                {/*<div className="TabNavBarItem__activeTabItemUnderline"></div>*/}
            </Link>
            <Link to={`/teams/${team.id}/teamInfo`}>
                <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Team</span></div>
                <div className=""></div>
            </Link>
            <Link to={`/teams/${team.id}/season-stats`}>
                <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Stats</span></div>
                <div className=""></div>
            </Link>
            <Link to={`/teams/${team.id}/opponents`}>
                <div className="TabNavBarItem__tabNavBarItem" role="tab"><span className="Text__text Text__left Text__cool-grey-dark Text__base Text__semibold TabNavBarItem__tabNavBarLabel">Opponents</span></div>
                <div className=""></div>
            </Link>    </div>
    );

}

export default TabNavBar;