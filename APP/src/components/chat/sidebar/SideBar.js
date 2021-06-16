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