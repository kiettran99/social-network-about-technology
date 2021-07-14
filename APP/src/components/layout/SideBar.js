import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBar = () => {

    const location = useLocation();

    // Get user in store
    const user = useSelector((state) => {
        return state.auth.user;
    });

    useEffect(() => {

        try {
            const findClassByPathname = (route) => {
                switch (route) {
                    case '':
                    case '/':
                        return 'posts';
                    case 'notification':
                        return 'notifications';
                    default:
                        return route;
                }
            }

            const pathname = location.pathname;

            const routePaths = pathname.split('/');

            if (routePaths.length > 1) {
                const route = routePaths[1];

                const $ul = document.getElementById('iq-sidebar-toggle');

                if ($ul) {
                    // Remove child li active
                    const listActive = $ul.querySelector('.active');

                    if (listActive) {
                        listActive.classList.remove('active');
                    }

                    // Find Child has classname same pathname
                    const className = '.' + findClassByPathname(route);

                    const childActive = $ul.querySelector(className);

                    if (childActive) {
                        childActive.classList.add('active');
                    }
                }
            }
        }
        catch {

        }

    }, [location]);

    return (
        <div className="iq-sidebar" >
            <div id="sidebar-scrollbar">
                <nav className="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" className="iq-menu">
                        <li className="posts">
                            <Link to="/" className="iq-waves-effect"><i className="las la-newspaper" /><span>Newsfeed</span></Link>
                        </li>
                        <li className="reviews">
                            <Link to="/reviews" className="iq-waves-effect"><i className="lar la-star"></i><span>Technology News</span></Link>
                        </li>
                        {user ? (
                            <>
                                <li className="friend-list">
                                    <Link to="/friend-list" className="iq-waves-effect"><i className="las la-user-friends" /><span>Friends List</span></Link>
                                </li>
                                <li className="friend-request">
                                    <Link to="/friend-request" className="iq-waves-effect"><i className="las la-user-plus" /><span>Friend Requests</span></Link>
                                </li>
                                <li className="messages">
                                    <Link to="/messages" className="iq-waves-effect"><i className="lab la-rocketchat" /><span>Messages</span></Link>
                                </li>
                                <li className="groups">
                                    <Link to="/groups" className="iq-waves-effect"><i className="las la-users" /><span>Groups</span></Link>
                                </li>
                                <li className="photos">
                                    <Link to="/photos" className="iq-waves-effect"><i className="las la-image" /><span>Photos</span></Link>
                                </li>
                                <li className="notifications">
                                    <Link to="/notification" className="iq-waves-effect"><i className="las la-bell" /><span>Notifications</span></Link>
                                </li>
                                <li className="ads">
                                    <Link to="/ads" className="iq-waves-effect"><i className="las la-bullhorn"></i><span>Advertisements</span></Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/register" className="iq-waves-effect"><i className="las la-pen" /><span>Create Your Account</span></Link>
                                </li>
                            </>
                        )}
                        <li className="faq">
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