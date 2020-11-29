import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { logout } from '../../actions/auth';
import NotificationBar from './notification-bar/NotificationBar';

const NavBar = ({ auth: { isAuthenticated, user, loading }, logout, loadingBar, history }) => {

  const ref = useRef(null);

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
            <Link to="/" className="iq-waves-effect d-flex align-items-center">
              <i className="ri-home-line" />
            </Link>
          </li>
          <li className="nav-item d-none d-sm-block">
            <a className="search-toggle iq-waves-effect" href="index.html#"><i className="ri-group-line" /></a>
            <div className="iq-sub-dropdown iq-sub-dropdown-large">
              <div className="iq-card shadow-none m-0">
                <div className="iq-card-body p-0 ">
                  <div className="bg-primary p-3">
                    <h5 className="mb-0 text-white">Friend Request<small className="badge  badge-light float-right pt-1">4</small></h5>
                  </div>
                  <div className="iq-friend-request">
                    <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="">
                          <img className="avatar-40 rounded" src="/images/user/01.jpg" alt="" />
                        </div>
                        <div className="media-body ml-3">
                          <h6 className="mb-0 ">Jaques Amole</h6>
                          <p className="mb-0">40  friends</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <a href="#" className="mr-3 btn btn-primary rounded">Confirm</a>
                        <a href="#" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                      </div>
                    </div>
                  </div>
                  <div className="iq-friend-request">
                    <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="">
                          <img className="avatar-40 rounded" src="/images/user/02.jpg" alt="" />
                        </div>
                        <div className="media-body ml-3">
                          <h6 className="mb-0 ">Lucy Tania</h6>
                          <p className="mb-0">12  friends</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <a href="#" className="mr-3 btn btn-primary rounded">Confirm</a>
                        <a href="#" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                      </div>
                    </div>
                  </div>
                  <div className="iq-friend-request">
                    <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="">
                          <img className="avatar-40 rounded" src="/images/user/03.jpg" alt="" />
                        </div>
                        <div className="media-body ml-3">
                          <h6 className="mb-0 ">Manny Petty</h6>
                          <p className="mb-0">3  friends</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <a href="#" className="mr-3 btn btn-primary rounded">Confirm</a>
                        <a href="#" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                      </div>
                    </div>
                  </div>
                  <div className="iq-friend-request">
                    <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="">
                          <img className="avatar-40 rounded" src="/images/user/04.jpg" alt="" />
                        </div>
                        <div className="media-body ml-3">
                          <h6 className="mb-0 ">Marsha Mello</h6>
                          <p className="mb-0">15  friends</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <a href="#" className="mr-3 btn btn-primary rounded">Confirm</a>
                        <a href="#" className="mr-3 btn btn-secondary rounded">Delete Request</a>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <a href="index.html#" className="mr-3 btn text-primary">View More Request</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <NotificationBar />
          <li className="nav-item dropdown">
            <a href="index.html#" className="search-toggle iq-waves-effect">
              <div id="lottie-mail">
                <i className="ri-mail-line"></i>
              </div>
              <span className="bg-primary dots" />
            </a>
            <div className="iq-sub-dropdown">
              <div className="iq-card shadow-none m-0">
                <div className="iq-card-body p-0 ">
                  <div className="bg-primary p-3">
                    <h5 className="mb-0 text-white">All Messages<small className="badge  badge-light float-right pt-1">5</small></h5>
                  </div>
                  <a href="index.html#" className="iq-sub-card">
                    <div className="media align-items-center">
                      <div className="">
                        <img className="avatar-40 rounded" src="/images/user/01.jpg" alt="" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Bni Emma Watson</h6>
                        <small className="float-left font-size-12">13 Jun</small>
                      </div>
                    </div>
                  </a>
                  <a href="index.html#" className="iq-sub-card">
                    <div className="media align-items-center">
                      <div className="">
                        <img className="avatar-40 rounded" src="/images/user/02.jpg" alt="" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Lorem Ipsum Watson</h6>
                        <small className="float-left font-size-12">20 Apr</small>
                      </div>
                    </div>
                  </a>
                  <a href="index.html#" className="iq-sub-card">
                    <div className="media align-items-center">
                      <div className="">
                        <img className="avatar-40 rounded" src="/images/user/03.jpg" alt="" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Why do we use it?</h6>
                        <small className="float-left font-size-12">30 Jun</small>
                      </div>
                    </div>
                  </a>
                  <a href="index.html#" className="iq-sub-card">
                    <div className="media align-items-center">
                      <div className="">
                        <img className="avatar-40 rounded" src="/images/user/04.jpg" alt="" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Variations Passages</h6>
                        <small className="float-left font-size-12">12 Sep</small>
                      </div>
                    </div>
                  </a>
                  <a href="index.html#" className="iq-sub-card">
                    <div className="media align-items-center">
                      <div className="">
                        <img className="avatar-40 rounded" src="/images/user/05.jpg" alt="" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Lorem Ipsum generators</h6>
                        <small className="float-left font-size-12">5 Dec</small>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </li>
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
                  <a href="profile.html" className="iq-sub-card iq-bg-primary-hover">
                    <div className="media align-items-center">
                      <div className="rounded iq-card-icon iq-bg-primary">
                        <i className="ri-file-user-line" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">My Profile</h6>
                        <p className="mb-0 font-size-12">View personal profile details.</p>
                      </div>
                    </div>
                  </a>
                  <a href="profile-edit.html" className="iq-sub-card iq-bg-warning-hover">
                    <div className="media align-items-center">
                      <div className="rounded iq-card-icon iq-bg-warning">
                        <i className="ri-profile-line" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Edit Profile</h6>
                        <p className="mb-0 font-size-12">Modify your personal details.</p>
                      </div>
                    </div>
                  </a>
                  <a href="account-setting.html" className="iq-sub-card iq-bg-info-hover">
                    <div className="media align-items-center">
                      <div className="rounded iq-card-icon iq-bg-info">
                        <i className="ri-account-box-line" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Account settings</h6>
                        <p className="mb-0 font-size-12">Manage your account parameters.</p>
                      </div>
                    </div>
                  </a>
                  <a href="privacy-setting.html" className="iq-sub-card iq-bg-danger-hover">
                    <div className="media align-items-center">
                      <div className="rounded iq-card-icon iq-bg-danger">
                        <i className="ri-lock-line" />
                      </div>
                      <div className="media-body ml-3">
                        <h6 className="mb-0 ">Privacy Settings</h6>
                        <p className="mb-0 font-size-12">Control your privacy parameters.</p>
                      </div>
                    </div>
                  </a>
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
      <div className="iq-top-navbar" style={{ zIndex: '2' }}>
        <div className="iq-navbar-custom">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <div className="iq-navbar-logo d-flex justify-content-between">
              <Link to="/">
                <img src="/images/logo.png" className="img-fluid" alt="" />
                <span>SocialV</span>
              </Link>
              <div className="iq-menu-bt align-self-center">
                <div className="wrapper-menu">
                  <div className="main-circle"><i className="ri-menu-line" /></div>
                </div>
              </div>
            </div>
            <div className="iq-search-bar">
              <form action="index.html#" className="searchbox">
                <input type="text" className="text search-input" placeholder="Type here to search..." />
                <a className="search-link" href="index.html#"><i className="ri-search-line" /></a>
              </form>
            </div>
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
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loadingBar: state.loadingBar
})

export default connect(mapStateToProps, { logout })(withRouter(NavBar));