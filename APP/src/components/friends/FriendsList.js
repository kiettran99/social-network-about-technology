import React from 'react';
import HeaderBackground from '../groups/header/HeaderBackground';
import FriendList from './friends/FriendList';

const FriendsList = () => {
    return (
        <>
            <HeaderBackground title={'Friends List'} imageUrl={'/images/page-img/profile-bg3.jpg'} />
            <div id="content-page" className="content-page">
                <div className="container">
                    <FriendList />
                </div>
            </div>
        </>
    );
};

export default FriendsList;