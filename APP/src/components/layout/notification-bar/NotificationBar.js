import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadNotification, clearNotification, makeAsRead, makeAsReadAll } from '../../../actions/notification';
import { Link } from 'react-router-dom';
import dayjs from '../../../utils/relativeDate';
import useNotificationPusher from './useNotificationPusher';

const NotificationBar = ({ notification: { notification, loading }, auth: { isAuthenticated },
    loadNotification, clearNotification, makeAsRead, makeAsReadAll }) => {

    useNotificationPusher(isAuthenticated, notification, loadNotification);

    useEffect(() => {
        if (isAuthenticated) {
            loadNotification();
        }
        else {
            // Clear Notification if user is log out.
            clearNotification();
        }
    }, [isAuthenticated]);

    const [isToggle, setIsToggle] = useState(false);

    const setToggle = () => {
        setIsToggle(!isToggle);
    };

    const onMarkAsRead = (id) => {
        makeAsRead(id);
    }

    const onMarkAsReadAll = () => {
        makeAsReadAll();
    };

    return (
        <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link dropdown-toggle" href="#" onClick={() => setToggle()} id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-bell"></i>
                <span className="badge badge-primary badge-counter">
                    {notification && notification.messages && notification.messages.filter(message => !message.status).length}
                </span>
            </a>
            <div className={`dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in ${isToggle && 'show'}`} aria-labelledby="messagesDropdown">
                <div className="dropdown-header d-flex justify-content-between">
                    <span>Notification</span>
                    <span className="button" onClick={() => onMarkAsReadAll()}>Mark as Read</span>
                </div>

                {loading ?
                    <h6 className="dropdown-item d-flex align-items-center text-muted">Please login in to following notification.</h6>
                    :
                    <>
                        <div className="overflow-auto">
                            {notification.messages && notification.messages.length >= 0 && notification.messages.length === 0 ?  <h6 className="dropdown-item d-flex align-items-center text-muted">Notification's Box is empty.</h6> :
                            notification.messages.map(message => (
                                <Link key={message._id} className="dropdown-item d-flex align-items-center"
                                    onClick={() => onMarkAsRead(message._id)}
                                    to={`/${message.topic}/${message.topicId}`}>
                                    <div className="dropdown-list-image mr-3"> <img className="rounded-circle" src="https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png" alt="" />
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div className={`${!message.status && "font-weight-bold"}`}>
                                        <div className="text-truncate">{message.text}</div>
                                        <div className="small text-gray-500">{message.name} · {dayjs(message.date).fromNow()}</div>
                                    </div>
                                </Link>))}
                        </div>

                        <button className="dropdown-item text-center small text-gray-500" onClick={() => loadNotification(0, 3 + notification.messages.length)}>Read all Messages</button>
                    </>}
            </div>
        </li >
    );
};

const mapStateToProps = (state) => ({
    notification: state.notification,
    auth: state.auth
});

export default connect(mapStateToProps, { loadNotification, clearNotification, makeAsRead, makeAsReadAll })(NotificationBar);