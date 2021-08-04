import React, { lazy, Suspense, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { logout } from '../../actions/auth';
import { resetPost } from '../../actions/post';

import Search from './search/Search';

import useAppearAdsManageer from '../../hooks/useAppearAdsManageer';

const NotificationBar = lazy(() => import('./notification-bar/NotificationBar'));
const FriendsRequest = lazy(() => import('./friends-request/FriendsRequest'));
const Channel = lazy(() => import('./channel/Channel'));

const NavBar = ({ auth: { isAuthenticated, user, loading },
  logout, loadingBar, resetPost
}) => {

  const ref = useRef(null);
  useAppearAdsManageer();

  const history = useHistory();

  useEffect(() => {
    if (ref.current) {
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
    }
  }, [loadingBar]);

  const userComponent = (user) => {
    return isAuthenticated && user && (
      <>
        <ul className="navbar-nav ml-auto navbar-list">
          <li>
            <Link to={`/profile/${user._id}`} className="iq-waves-effect d-flex align-items-center">
              <img src={user.avatar} className="img-fluid rounded-circle mr-3" alt="user" />
              <div className="caption">
                <h6 className="mb-0 line-height">{user.fullname}</h6>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/" className="iq-waves-effect d-flex align-items-center"
              onClick={() => {
                resetPost(true);
              }}>
              <i className="ri-home-line" />
            </Link>
          </li>
          <Suspense fallback={<div></div>}>
            <FriendsRequest />
            <Channel />
            <NotificationBar />
          </Suspense>
        </ul>
        <ul className="navbar-list">
          <li>
            <a href="index.html#" className="search-toggle iq-waves-effect d-flex align-items-center">
              <i className="ri-arrow-down-s-fill" />
            </a>
            <div className="iq-sub-dropdown iq-user-dropdown">
              <div className="iq-card shadow-none m-0">
                <div className="iq-card-body p-0 ">
                  <div className="bg-primary p-3 line-height d-none d-sm-block">
                    <h5 className="mb-0 text-white line-height">Hello {user.fullname}</h5>
                    <span className="text-white font-size-12">Available</span>
                  </div>
                  <Link to={`/profile/${user._id}`} className="iq-sub-card iq-bg-primary-hover">
                    <div className="media align-items-center">
                      <div className="rounded iq-card-icon iq-bg-primary">
                        <i className="ri-file-user-line" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">My Profile</h6>
                        <p className="mb-0 font-size-12">View personal profile details.</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/profile/edit" className="iq-sub-card iq-bg-warning-hover">
                    <div className="media align-items-center">
                      <div className="rounded iq-card-icon iq-bg-warning">
                        <i className="ri-profile-line" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Edit Profile</h6>
                        <p className="mb-0 font-size-12">Modify your personal details.</p>
                      </div>
                    </div>
                  </Link>
                  <div className="d-inline-block w-100 text-center p-3">
                    <Link to='' className="bg-primary iq-sign-btn text-light" role="button"
                      onClick={() => {
                        logout(history);
                      }}
                    >Sign out<i className="ri-login-box-line ml-2" /></Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </>
    );
  };

  const guestComponent = (
    <div className="navbar-nav ml-auto navbar-list">
      <Link className="bg-primary iq-sign-btn my-3" to="/login" role="button">Login</Link>
      <Link className="bg-primary iq-sign-btn m-3" to="/register" role="button">Join us</Link>
    </div>
  );

  return (
    <>
      <LoadingBar color='#07689f' ref={ref} />
      <div className="iq-top-navbar" style={{ zIndex: '10' }}>
        <div className="iq-navbar-custom">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <div className="iq-navbar-logo d-flex justify-content-between">
              <Link onClick={() => {
                resetPost();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} to="/">
                <img src="/images/logo.png" className="img-fluid" alt="" />
                <span>SocialV</span>
              </Link>
              <div className="iq-menu-bt align-self-center">
                <div className="wrapper-menu">
                  <div className="main-circle"><i className="ri-menu-line" /></div>
                </div>
              </div>
            </div>
            <Search />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
              <i className="ri-menu-3-line" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {!loading && user ? userComponent(user) : (
                <div className="float-right p-sm-0 pl-4">
                  {guestComponent}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  resetPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loadingBar: state.loadingBar
})

export default connect(mapStateToProps, {
  logout, resetPost
})(React.memo(NavBar));