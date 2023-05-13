import { Link } from 'react-router-dom';
import './TopNavBar.scss';

function TopNavBar() {
    return (
        <>
            <div className="NavBar__stickyItem StickyItem__stickyItem" data-sticky-name="Navbar" data-sticky="true">
                <div className="NavBar__navBarContainer NavBar__loggedIn" data-testid="login-navbar-test-id">
                    <Link to="/"></Link>
                    <div className="NavBarMenu__dropdown"><span className="Clickable__container" role="button">
                        <span className="Text__text Text__left Text__white Text__base Text__bold">Menu</span>
                    </span>
                    </div>
                    <div className="NavBarMenu__nav-menu-container NavBarMenu__hide">
                        <Link to="/">
                            <span className="NavBarMenu__teams">
                                <span className="Text__text Text__left Text__white Text__base Text__semibold NavBarMenu__teams">My Teams</span>
                            </span>

                        </Link>
                        <span className="Clickable__container NavBarMenu__signoutContainer" role="button" >
                            <div className="Avatar__container Avatar__grey-background Avatar__small NavBarMenu__avatar"><div className="Avatar__centered">
                                <div className="Avatar__text"><span className="Text__text Text__left Text__white Text__small Text__bold">YS</span></div></div><div className="Avatar__status-accessory">
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

        </>
    );
}

export default TopNavBar;
