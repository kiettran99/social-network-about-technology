import React, { useState, lazy, Suspense } from 'react';
import { connect, useSelector } from 'react-redux';

import { searchUser } from '../../groups/services/groupServices';

import LoadMore from '../../shared/LoadMore';

const About = lazy(() => import('./about/About'));
const Channel = lazy(() => import('./channel/Channel'));
const Search = lazy(() => import('./search/Search'));

// Constant
const CHANNEL_LIMIT = 7;

const SideBar = ({ socket }) => {

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const { user, previewMessageBox, length } = useSelector((state) => {
        return {
            user: state.auth.user,
            previewMessageBox: state.chat.previewMessageBox,
            length: state.chat.length
        };
    });

    const onSearchUser = (e) => {
        setSearch(e.target.value);

        // Fetch users list search
        searchUser(e.target.value).then(users => setUsers(users));
    };

    const getMore = (callback) => {
        // Emit events and provide limit users.
        socket.emit('chat-rooms', previewMessageBox.length + CHANNEL_LIMIT);
        callback();
    }

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
                        {previewMessageBox.length !== length && (
                            <div className="text-center mt-2">
                                <LoadMore action={getMore} />
                            </div>
                        )}
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

export default connect(null)(SideBar);