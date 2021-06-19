import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="iq-sidebar" >
            <div id="sidebar-scrollbar">
                <nav className="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" className="iq-menu">
                        <li className="active">
                            <Link to="/" className="iq-waves-effect"><i className="las la-newspaper" /><span>Newsfeed</span></Link>
                        </li>
                        <li>
                            <Link to="/reviews" className="iq-waves-effect"><i className="lar la-star"></i><span>Products Review</span></Link>
                        </li>
                        <li>
                            <Link to="/friend-list" className="iq-waves-effect"><i className="las la-user-friends" /><span>Friend Lists</span></Link>
                        </li>
                        <li>
                            <Link to="/friend-request" className="iq-waves-effect"><i className="las la-user-plus" /><span>Friend Request</span></Link>
                        </li>
                        <li>
                            <Link to="/messages" className="iq-waves-effect"><i className="lab la-rocketchat" /><span>Messages</span></Link>
                        </li>
                        <li>
                            <Link to="/groups" className="iq-waves-effect"><i className="las la-users" /><span>Group</span></Link>
                        </li>
                        <li>
                            <Link to="/photos" className="iq-waves-effect"><i className="las la-image" /><span>Photos</span></Link>
                        </li>
                        <li>
                            <Link to="/notification" className="iq-waves-effect"><i className="las la-bell" /><span>Notification</span></Link>
                        </li>
                        <li>
                            <Link to="/ads" className="iq-waves-effect"><i className="las la-bullhorn"></i><span>Advertisements</span></Link>
                        </li>
                        <li>
                            <Link to="/faq" className="iq-waves-effect"><i className="las la-comments"></i><span>FAQ</span></Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-3" />
            </div>
        </div >
    );
};

export default React.memo(SideBar);