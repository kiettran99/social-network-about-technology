import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar';
import loadingNotification from '../../images/loading-notification-opt.gif';

// Code-Split Lazing loading Components
const NotificationBar = lazy(() => import('./notification-bar/NotificationBar'));

const Header = ({ auth: { isAuthenticated, loading, user }, logout, loadingBar }) => {

    const [collapsed, setCollapsed] = useState(true);
    const ref = useRef(null);

    const onToggleNavigation = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        switch (loadingBar) {
            case 'REQUEST_LOADING':
                ref.current.continuousStart();
                return;
            case 'COMPLETE_LOADING':
                ref.current.complete();
                return;
            default:
                return;
        }
    }, [loadingBar]);

    const guestLinks = (
        <>
            <Link className="btn btn-success mr-3" to="/login"
            >Login</Link>

            <Link className="btn btn-primary" to="/register"
            >Sign up</Link>
        </>
    );

    const userLinks = (
        <>
            {user && <label className="mr-3">Hello, {user.name}</label>}

            {user && user.role === 'customer' ?
                <Link className="btn btn-success mr-2" to="/cart"
                ><i className="fas fa-shopping-cart" style={{ transform: "rotateY(180deg) !important" }} ></i>
                &nbsp;View Cart</Link> :
                <Link className="btn btn-success mr-2" to="/products/add">Add Product</Link>}
            <button className="btn btn-danger" onClick={() => {
                logout();
            }}
            >Sign out</button>
        </>
    );

    return (
        <>
            <LoadingBar color='#07689f' ref={ref} />
            <nav className="navbar navbar-expand-xl navbar-light bg-light">
                <Link className="navbar-brand" to="/">Mobile Store</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContentXL" aria-controls="navbarSupportedContentXL"
                    aria-expanded="false" aria-label="Toggle navigation"
                    onClick={() => onToggleNavigation()} >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${collapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContentXL">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/" >Home <span className="sr-only">(current)</span></Link>
                        </li>

                        <Suspense fallback={
                            <li className="nav-item">
                                <img alt="..." src={loadingNotification}/>
                            </li>
                        }>
                            <NotificationBar />
                        </Suspense>
                        {/* <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li> */}
                        {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownXL" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className={`dropdown-menu ${toggle ? 'show': ''}`} aria-labelledby="navbarDropdownXL">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li> */}
                        {/* <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}

                    <div className="text-right">
                        <div>
                            {!loading && (<>{isAuthenticated ? userLinks : guestLinks}</>)}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        loadingBar: state.loadingBar
    }
};

export default connect(mapStateToProps, { logout })(Header);