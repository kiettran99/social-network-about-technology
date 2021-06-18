import React from 'react';
import { useSelector } from 'react-redux';

import dayjs from '../../../../utils/dayjs/calendar';

const Contents = ({ messages, isBlock }) => {

    const { requester, recipient } = useSelector((state) => {
        return {
            requester: {
                _id: state.auth.user?._id,
                avatar: state.auth.user?.avatar
            },
            recipient: {
                _id: state.chat.userProfile?._id,
                avatar: state.chat.userProfile?.avatar
            }
        }
    });

    const avatarByUser = (message) => {
        if (recipient && recipient._id && message.user === recipient._id) {
            return recipient.avatar;
        }
        else {
            if (requester && requester._id) {
                return requester.avatar;
            }
            else {
                return '/images/user/none-user.png';
            }
        }
    };

    const isUserOfMessage = (message) => {

        if (recipient && recipient._id && message.user === recipient._id) {
            return false;
        }

        return true;
    }

    return (
        <div id="messages" className="chat-content scroller">
            {!isBlock && messages && messages.length > 0 && messages.map((message, index) => (
                <div className={`chat ${isUserOfMessage(message) ? '' : 'chat-left'}`} key={index}>
                    <div className="chat-user">
                        <a className="avatar m-0">
                            <img src={avatarByUser(message)} alt="avatar" className="avatar-35 rounded-circle"
                                data-toggle="tooltip" title={dayjs(message.createdAt).calendar(dayjs())} />
                        </a>
                        {/* <span className="chat-time mt-1">{dayjs(message.createdAt).calendar(dayjs())}</span> */}
                    </div>
                    <div className="chat-detail">
                        <div className="chat-message">
                            <p>{message.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default React.memo(Contents);