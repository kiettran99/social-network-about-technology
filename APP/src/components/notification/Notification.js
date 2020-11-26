import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import dayjs from '../../utils/relativeDate';
import { loadNotification, makeAsReadAll } from '../../actions/notification';

const Notification = ({ notification: { notification },
    loadNotification, makeAsReadAll
}) => {

    useEffect(() => {
        loadNotification(0, 12);
    }, []);

    // Auto Sroll on Top, when component did mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Notification</h4>
                            </div>
                            <div className="iq-header-title">
                                <button className="btn btn-link"
                                    onClick={() => makeAsReadAll()}
                                >Make as Read All</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        {notification && (
                            notification.messages && notification.messages.length >= 0 && notification.messages.length === 0 ?
                                <h6 className="d-flex align-items-center text-muted p-3">
                                    Notification's Box is empty.
                                 </h6> :
                                notification.messages.map(message => (
                                    <div className="iq-card">
                                        <div className="iq-card-body">
                                            <ul className="notification-list m-0 p-0">
                                                <li className="d-flex align-items-center">
                                                    <div className="user-img img-fluid"><img src={message.user.avatar} alt="story-img" className="rounded-circle avatar-40" /></div>
                                                    <div className="media-support-info ml-3">
                                                        <h6 className={`mb-0 ${message.status ? '' : 'font-weight-bold'}`}>{message.text}</h6>
                                                        <p className="mb-0">· {dayjs(message.date).fromNow()}</p>
                                                    </div>
                                                    {/* <div className="d-flex align-items-center">
                                                        <a href="javascript:void();" className="mr-3 iq-notify iq-bg-primary rounded"><i className="ri-award-line" /></a>
                                                        <div className="iq-card-header-toolbar d-flex align-items-center">
                                                            <div className="dropdown">
                                                                <span className="dropdown-toggle" data-toggle="dropdown">
                                                                    <i className="ri-more-fill" />
                                                                </span>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="notification.html#"><i className="ri-eye-fill mr-2" />View</a>
                                                                    <a className="dropdown-item" href="notification.html#"><i className="ri-delete-bin-6-fill mr-2" />Delete</a>
                                                                    <a className="dropdown-item" href="notification.html#"><i className="ri-pencil-fill mr-2" />Edit</a>
                                                                    <a className="dropdown-item" href="notification.html#"><i className="ri-printer-fill mr-2" />Print</a>
                                                                    <a className="dropdown-item" href="notification.html#"><i className="ri-file-download-fill mr-2" />Download</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>*/}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    notification: state.notification
});

export default connect(mapStateToProps, { loadNotification, makeAsReadAll })(Notification);