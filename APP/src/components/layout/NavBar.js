import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const userAccountSettings = useRef();

    const onClickUserAccount = () => {
        const style = userAccountSettings.current.style;
        if (style.display === 'block') {
            style.display = 'none';
        }
        else {
            style.display = 'block';
        }
    };

    return (
        <header>
            <div className="container" style={{ display: "block"}}>
                <div className="header-data">
                    <div className="logo">
                        <Link to="/" ><img src="imLinkges/logo.png" alt="MXH" /></Link>
                    </div>
                    <div className="search-bar">
                        <form>
                            <input type="text" name="search" placeholder="Search..." />
                            <button type="submit"><i className="la la-search" /></button>
                        </form>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/" >
                                    <span><img src="images/icon1.png" alt="" /></span> Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/groups" >
                                    <span><img src="images/icon2.png" alt="" /></span>
                      Groups
                    </Link>
                                <ul>
                                    <li><a href="companies.html" >Companies</a></li>
                                    <li><a href="company-profile.html" >Company Profile</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="projects.html" >
                                    <span><img src="images/icon3.png" alt="" /></span>
                      Projects
                    </a>
                            </li>
                            <li>
                                <a href="profiles.html" >
                                    <span><img src="images/icon4.png" alt="" /></span>
                      Profiles
                    </a>
                                <ul>
                                    <li><a href="user-profile.html" >User Profile</a></li>
                                    <li><a href="my-profile-feed.html" >my-profile-feed</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="jobs.html" >
                                    <span><img src="images/icon5.png" alt="" /></span>
                      Jobs
                    </a>
                            </li>
                            <li>
                                <a href="index.html#" className="not-box-openm">
                                    <span><img src="images/icon6.png" alt="" /></span>
                      Messages
                    </a>
                                <div className="notification-box msg" id="message">
                                    <div className="nt-">
                                        <h4>Setting</h4>
                                        <a href="index.html#" >Clear all</a>
                                    </div>
                                    <div className="nott-list">
                                        <div className="notfication-details">
                                            <div className="noty-user-img">
                                                <img src="images/resources/ny-img1.png" alt="" />
                                            </div>
                                            <div className="notification-info">
                                                <h3><a href="messages.html" >Jassica William</a> </h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
                                                <span>2 min ago</span>
                                            </div>
                                        </div>
                                        <div className="notfication-details">
                                            <div className="noty-user-img">
                                                <img src="images/resources/ny-img2.png" alt="" />
                                            </div>
                                            <div className="notification-info">
                                                <h3><a href="messages.html" >Jassica William</a></h3>
                                                <p>Lorem ipsum dolor sit amet.</p>
                                                <span>2 min ago</span>
                                            </div>
                                        </div>
                                        <div className="notfication-details">
                                            <div className="noty-user-img">
                                                <img src="images/resources/ny-img3.png" alt="" />
                                            </div>
                                            <div className="notification-info">
                                                <h3><a href="messages.html" >Jassica William</a></h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                              eiusmod tempo incididunt ut labore et dolore magna aliqua.</p>
                                                <span>2 min ago</span>
                                            </div>
                                        </div>
                                        <div className="view-all-nots">
                                            <a href="messages.html" >View All Messsages</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="index.html#" className="not-box-open">
                                    <span><img src="images/icon7.png" alt="" /></span>
                      Notification
                    </a>
                                <div className="notification-box noti" id="notification">
                                    <div className="nt-">
                                        <h4>Setting</h4>
                                        <a href="index.html#" >Clear all</a>
                                    </div>
                                    <div className="nott-list">
                                        <div className="notfication-details">
                                            <div className="noty-user-img">
                                                <img src="images/resources/ny-img1.png" alt="" />
                                            </div>
                                            <div className="notification-info">
                                                <h3><a href="index.html#" >Jassica William</a> Comment on your
                              project.</h3>
                                                <span>2 min ago</span>
                                            </div>
                                        </div>
                                        <div className="notfication-details">
                                            <div className="noty-user-img">
                                                <img src="images/resources/ny-img2.png" alt="" />
                                            </div>
                                            <div className="notification-info">
                                                <h3><a href="index.html#" >Jassica William</a> Comment on your
                              project.</h3>
                                                <span>2 min ago</span>
                                            </div>
                                        </div>
                                        <div className="notfication-details">
                                            <div className="noty-user-img">
                                                <img src="images/resources/ny-img3.png" alt="" />
                                            </div>
                                            <div className="notification-info">
                                                <h3><a href="index.html#" >Jassica William</a> Comment on your
                              project.</h3>
                                                <span>2 min ago</span>
                                            </div>
                                        </div>
                                        <div className="notfication-details">
                                            <div className="noty-user-img">
                                                <img src="images/resources/ny-img2.png" alt="" />
                                            </div>
                                            <div className="notification-info">
                                                <h3><a href="index.html#" >Jassica William</a> Comment on your
                              project.</h3>
                                                <span>2 min ago</span>
                                            </div>
                                        </div>
                                        <div className="view-all-nots">
                                            <a href="index.html#" >View All Notification</a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div className="menu-btn">
                        <a href="index.html#" ><i className="fa fa-bars" /></a>
                    </div>
                    <div className="user-account">
                        <div className="user-info"
                        onClick={() => onClickUserAccount()}>
                            <img src="images/resources/user.png" alt="" />
                            <a href="index.html#" >John</a>
                            <i className="la la-sort-down" />
                        </div>
                        <div className="user-account-settingss" ref={userAccountSettings} id="users">
                            <h3>Online Status</h3>
                            <ul className="on-off-status">
                                <li>
                                    <div className="fgt-sec">
                                        <input type="radio" name="cc" id="c5" />
                                        <label htmlFor="c5">
                                            <span />
                                        </label>
                                        <small>Online</small>
                                    </div>
                                </li>
                                <li>
                                    <div className="fgt-sec">
                                        <input type="radio" name="cc" id="c6" />
                                        <label htmlFor="c6">
                                            <span />
                                        </label>
                                        <small>Offline</small>
                                    </div>
                                </li>
                            </ul>
                            <h3>Custom Status</h3>
                            <div className="search_form">
                                <form>
                                    <input type="text" name="search" />
                                    <button type="submit">Ok</button>
                                </form>
                            </div>
                            <h3>Setting</h3>
                            <ul className="us-links">
                                <li><a href="profile-account-setting.html" >Account Setting</a></li>
                                <li><a href="index.html#" >Privacy</a></li>
                                <li><a href="index.html#" >Faqs</a></li>
                                <li><a href="index.html#" >Terms &amp; Conditions</a></li>
                            </ul>
                            <h3 className="tc"><a href="sign-in.html" >Logout</a></h3>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
};

export default NavBar;