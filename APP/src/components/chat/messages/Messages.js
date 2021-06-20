import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getUserProfile, getChatErrors } from '../../../actions/chat';

import Contents from './content/Contents';
import Footer from './footer/Footer';
import Header from './header/Header';

const Messages = ({ socket, match, getUserProfile, getChatErrors }) => {

    const [messages, setMessages] = useState([]);
    const [isBlock, setBlock] = useState(false);

    useEffect(() => {

        socket.emit('get-user-profile', match.params.id, (errors, userProfile) => {
            if (errors) {
                return getChatErrors(errors);
            }

            getUserProfile(userProfile);
        });

        socket.off('loading');
        socket.off('message');
        socket.off('update-user-profile');

        socket.on('loading', (data) => {
            const { messages = [], isBlock = false } = data;
            setMessages(messages.reverse());
            setBlock(isBlock);

            autoScroll();
        });

        socket.on('message', (message) => {
            setMessages(state => [...state, message]);
        }, (error) => {
            console.log(error);
        });

        socket.on('update-user-profile', () => {
            socket.emit('get-user-profile', match.params.id, (errors, userProfile) => {
                if (errors) {
                    return getChatErrors(errors);
                }

                getUserProfile(userProfile);
            });
        });

    }, [match]);

    useEffect(() => {
        autoScroll(true);
    }, [messages]);

    const autoScroll = (isUpdated = false) => {
        const $messages = document.querySelector('#messages');

        if (isUpdated) {
            // Last element chat in message
            const $newMessage = $messages.lastElementChild;

            // Height of the new message
            if ($newMessage) {
                // Height of the new message
                const newMessageStyles = getComputedStyle($newMessage)
                const newMessageMargin = parseInt(newMessageStyles.marginBottom)
                const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

                // Visible height
                const visibleHeight = $messages.offsetHeight

                // Height of messages container
                const containerHeight = $messages.scrollHeight

                // How far have I scrolled?
                const scrollOffset = $messages.scrollTop + visibleHeight

                if (containerHeight - newMessageHeight * 2 <= scrollOffset) {
                    $messages.scrollTop = $messages.scrollHeight
                }
            }
        }
        else {
            $messages.scrollTop = $messages.scrollHeight
        }
    };

    // Block User
    const blockUser = () => {

        const confirm = window.confirm('Are you sure delete chat ?');

        if (confirm) {
            socket.emit('block', { recipient: match.params.id }, (error) => {
                if (error) {
                    return console.log(error);
                }
            });
        }
    };

    // Restore Chat Messages.
    const retsoreMessages = () => {
        if (isBlock) {
            setBlock(false);
            autoScroll();
        }
    };

    return (
        <div className="col-lg-9 chat-data p-0 chat-data-right">
            <div className="tab-content">
                <div className="tab-pane fade" id="default-block" role="tabpanel">
                    <div className="chat-start">
                        <span className="iq-start-icon text-primary"><i className="ri-message-3-line" /></span>
                        <button id="chat-start" className="btn bg-white mt-3">Start
                            Conversation!</button>
                    </div>
                </div>
                <div className="tab-pane fade active show" id="chatbox1" role="tabpanel">
                    <Header blockUser={blockUser} match={match} />
                    <Contents messages={messages} isBlock={isBlock} />
                    <Footer socket={socket} match={match} retsoreMessages={retsoreMessages} />
                </div>
            </div>
        </div>
    );
};

export default connect(null, { getUserProfile, getChatErrors })(React.memo(Messages));