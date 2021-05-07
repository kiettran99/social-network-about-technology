import React, { useEffect, useState, lazy, Suspense } from 'react';
import { connect, useSelector } from 'react-redux';

import { getPreviewMessageBox } from '../../../actions/chat';
import { searchUser } from '../../groups/services/groupServices';

const About = lazy(() => import('./about/About'));
const Channel = lazy(() => import('./channel/Channel'));
const Search = lazy(() => import('./search/Search'));

const SideBar = ({ socket, getPreviewMessageBox }) => {

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const { user, previewMessageBox } = useSelector((state) => {
        return {
            user: state.auth.user,
            previewMessageBox: state.chat.previewMessageBox
        };
    })

    useEffect(() => {
        socket.emit('chat-rooms');

        socket.off('reload-messages');
        socket.off('get-chat-list');

        socket.on('reload-messages', () => {
            socket.emit('chat-rooms');
        });

        socket.on('get-chat-list', (options) => {

            const { error, chatList } = options || {};

            if (error) {
                return console.log(error);
            }

            getPreviewMessageBox(chatList);
        });
    }, []);

    const onSearchUser = (e) => {
        setSearch(e.target.value);

        // Fetch users list search
        searchUser(e.target.value).then(users => setUsers(users));
    };

    return (
        <Suspense fallback={<div></div>}>
            <div className="col-lg-3 chat-data-left scroller">
                <div className="chat-search pt-3 pl-3">
                    <About user={user} />
                    <div id="user-detail-popup" className="scroller">
                        <div className="user-profile">
                            <button type="submit" className="close-popup p-3"><i className="ri-close-fill" /></button>
                            <div className="user text-center mb-4">
                                <a className="avatar m-0">
                                    <img src="/images/user/1.jpg" alt="avatar" />
                                </a>
                                <div className="user-name mt-4">
                                    <h4>Bni Jordan</h4>
                                </div>
                                <div className="user-desc">
                                    <p>Web Designer</p>
                                </div>
                            </div>
                            <hr />
                            <div className="user-detail text-left mt-4 pl-4 pr-4">
                                <h5 className="mt-4 mb-4">About</h5>
                                <p>It is long established fact that a reader will be distracted bt the reddable.</p>
                                <h5 className="mt-3 mb-3">Status</h5>
                                <ul className="user-status p-0">
                                    <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-success pr-1" /><span>Online</span></li>
                                    <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-warning pr-1" /><span>Away</span></li>
                                    <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-danger pr-1" /><span>Do Not Disturb</span></li>
                                    <li className="mb-1"><i className="ri-checkbox-blank-circle-fill text-light pr-1" /><span>Offline</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="chat-searchbar mt-4">
                        <div className="form-group chat-search-data m-0">
                            <input type="text" className="form-control round" id="chat-search" placeholder="Search"
                                value={search}
                                onChange={e => onSearchUser(e)} />
                            <i className="ri-search-line" />
                        </div>
                    </div>
                </div>
                {search.length === 0 ? (
                    <div className="chat-sidebar-channel scroller mt-4 pl-3">
                        <Channel previewMessageBox={previewMessageBox} />
                    </div>
                ) : (
                    <div className="chat-sidebar-channel scroller mt-1 pl-3">
                        <Search users={users} setSearch={setSearch} />
                    </div>
                )}
            </div>
        </Suspense>
    );
};

export default connect(null, { getPreviewMessageBox })(SideBar);