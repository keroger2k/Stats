import { Link } from 'react-router-dom';
import './TopNavBar.scss';

function TopNavBar() {
    return (
        <>
            <nav className="navbar bg-body-tertiary bg-dark navbar-expand-lg sticky-top ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src="https://web.gc.com/static/images/gc-logo-light.b1d6bb7aab22d45d98490adeb89dee8d.svg" alt="Logo" className="d-inline-block align-text-top" />
                    </a>
                </div>
                <form className="d-flex" role="search">
                    <Link to={`/teams/opponents`}>
                        <button type="button" className="btn btn-outline-secondary" data-testid="add-event-button">
                            <span className="Text__text Text__left Text__white Text__base Text__bold Add_Team">Add&nbsp;Team</span>
                        </button>
                    </Link>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </form>
            </nav>
        </>
    );
}

export default TopNavBar;
