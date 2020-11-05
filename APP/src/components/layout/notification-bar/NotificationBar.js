import React, { useEffect } from 'react';
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

    const onMarkAsRead = (id) => {
        makeAsRead(id);
    }

    const onMarkAsReadAll = () => {
        makeAsReadAll();
    };

    const notificationQuantity = (notification) => {
        return notification && notification.messages && notification.messages.filter(message => !message.status).length
    };

    const notificationBox = (notification) => {
        return notification && (
            notification.messages && notification.messages.length >= 0 && notification.messages.length === 0 ?
                <h6 className="d-flex align-items-center text-muted p-3">
                    Notification's Box is empty.
                 </h6> :
                notification.messages.map(message => (

                    <Link key={message._id} className="iq-sub-card"
                        onClick={() => onMarkAsRead(message._id)}
                        to={`/${message.topic}/${message.topicId}`}>
                        <div className="media align-items-center">
                            <div className="">
                                <img className="avatar-40 rounded" src="images/user/01.jpg" alt="" />
                            </div>
                            <div className="media-body ml-3">
                                <h6 className="mb-0 ">{message.text}</h6>
                                <small className="float-right font-size-12">{message.name} · {dayjs(message.date).fromNow()}</small>
                            </div>
                        </div>
                    </Link>
                ))
        );
    }

    return (
        <li className="nav-item">
            <a href="index.html#" className="search-toggle iq-waves-effect">
                <div id="lottie-beil">
                    <i className="ri-notification-line"></i>
                </div>
                {!!notificationQuantity(notification) && notificationQuantity(notification) !== 0 && <span className="bg-danger dots" />}
            </a>
            <div className="iq-sub-dropdown">
                <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0 ">
                        <div className="bg-primary p-3">
                            <h5 className="mb-0 text-white">All Notifications<small className="badge  badge-light float-right pt-1">{notificationQuantity(notification)}</small></h5>
                        </div>
                        {!loading && notification && notificationBox(notification)}

                    </div>
                </div>
            </div>
        </li>

    );
};

const mapStateToProps = (state) => ({
    notification: state.notification,
    auth: state.auth
});

export default connect(mapStateToProps, { loadNotification, clearNotification, makeAsRead, makeAsReadAll })(NotificationBar);