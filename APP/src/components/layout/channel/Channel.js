import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import dayjs from '../../../utils/relativeDate';
import { getPreviewMessageBox } from '../../../actions/chat';
import useSocketIO from '../../chat/useSocketIO';
import urlAPI from '../../../utils/urlAPI';

const ParseHtml = React.lazy(() => import('../../shared/ParseHtml'));

// Constant
const CHANNEL_LIMIT = 7;

const Channel = ({ getPreviewMessageBox }) => {

    const { socket } = useSocketIO(urlAPI, {
        query: { token: localStorage.token },
        reconnect: true,
        transports: ['websocket']
    });

    const { user, previewMessageBox } = useSelector((state) => {
        return {
            user: state.auth.user,
            previewMessageBox: state.chat.previewMessageBox
        };
    });

    const [countUnRead, setCountUnRead] = useState(0);

    const calculateCountUnRead = () => {
        try {
            if (user && previewMessageBox && previewMessageBox.length > 0) {

                const count = previewMessageBox.reduce((prevValue, preview) => {
                    const messages = preview.messageBox.messages;

                    if (messages) {
                        const isAsRead = messages.status.find((object => object.user === user._id))?.isAsRead;

                        if (!isAsRead) {
                            return prevValue + 1;
                        }
                    }

                    return prevValue;
                }, 0);

                setCountUnRead(count);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        // Emit events and provide limit users.
        socket.emit('chat-rooms', previewMessageBox.length + CHANNEL_LIMIT);

        socket.off('reload-messages');
        socket.off('get-chat-list');

        socket.on('reload-messages', () => {
            socket.emit('chat-rooms', previewMessageBox.length + CHANNEL_LIMIT);
        });

        socket.on('get-chat-list', (options) => {

            const { error, chatList, length = 0 } = options || {};

            if (error) {
                return console.log(error);
            }

            getPreviewMessageBox(chatList, length);
        });
    }, []);

    // Calculate Unread messages
    useEffect(() => {
        calculateCountUnRead();
    }, [previewMessageBox, user]);

    // Notification Unread message on Web title
    useEffect(() => {
        if (countUnRead > 0) {
            document.title = `(${countUnRead}) Social Network`;
        }
        else {
            document.title = 'Social Network';
        }
    }, [countUnRead]);


    const previewOnMessage = (preview) => {
        try {
            const messages = preview.messageBox.messages;

            if (messages && user) {
                const isAsRead = messages.status.find((object => object.user === user._id))?.isAsRead;

                return <small className={`${isAsRead ? '' : 'font-weight-bold'}`}><ParseHtml text={preview.messageBox.messages?.text} length={30} shouldTruncate={true} byWords={false} /></small>
            }

            return <small><ParseHtml text={preview.messageBox.messages?.text} length={30} shouldTruncate={true} byWords={false} /></small>
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <li className="nav-item dropdown">
            <a href="#" className="search-toggle iq-waves-effect">
                <div id="lottie-mail">
                    <i className="ri-mail-line"></i>
                </div>
                {countUnRead > 0 && <span className="bg-primary dots" />}
            </a>
            <div className="iq-sub-dropdown">
                <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0 ">
                        <div className="bg-primary p-3">
                            <h5 className="mb-0 text-white">All Messages
                                <small className="badge  badge-light float-right pt-1">{countUnRead}</small>
                            </h5>
                        </div>
                        {previewMessageBox && previewMessageBox.slice(0, 3).map(preview => (
                            <Link key={preview._id}
                                to={`/messages/${preview.recipient._id}`} className="iq-sub-card">
                                <div className="media align-items-center">
                                    <div className="avatar mr-2">
                                        <img src={preview.recipient.avatar} alt="chatuserimage" className="avatar-50 rounded-circle" />
                                        {preview.recipient.available && <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success" /></span>}
                                    </div>
                                    <div className="media-body ml-3">
                                        <h6 className="mb-0">{preview.recipient.fullname}</h6>
                                        <div className="mb-1"> {previewOnMessage(preview)}</div>
                                        <small className="float-left font-size-12">{dayjs(preview.messageBox.messages?.createdAt).fromNow(true)}</small>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <div className="text-center">
                            <Link to="/messages" className="mr-3 btn text-primary">View More Messages</Link>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default connect(null, { getPreviewMessageBox })(React.memo(Channel));