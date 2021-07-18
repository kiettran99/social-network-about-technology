import React, { useEffect, lazy, Suspense } from 'react';
import useSocketIO from './useSocketIO';
import urlAPI from '../../utils/urlAPI';
import StartChat from './StartChat';

const Messages = lazy(() => import('./messages/Messages'));
const SideBar = lazy(() => import('./sidebar/SideBar'));

const Chat = ({ match }) => {

    const { socket } = useSocketIO(urlAPI, {
        query: { token: localStorage.token },
        reconnect: true,
        transports: ['websocket']
    });

    useEffect(() => {

        socket.emit('join', { recipient: match.params.id }, (error) => {
            if (error) {
                console.log(error);
            }
        });

        socket.off('notification');

        socket.on('notification', (text) => {
            console.log(text);
        })

    }, [match]);

    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="iq-card">
                            <div className="iq-card-body chat-page p-0">
                                <div className="chat-data-block">
                                    <div className="row">
                                        <Suspense fallback={<div></div>}>
                                            <SideBar socket={socket} />
                                            {match && match.params.id ? <Messages socket={socket} match={match} />: <StartChat />}
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;