import React from 'react';
import GroupList from './GroupList';
import HeaderBackground from './header/HeaderBackground';

const Groups = () => {
    return (
        <div>
            <HeaderBackground title={'Groups'} imageUrl={'/images/page-img/profile-bg7.jpg'} />
            {/* Page Content  */}
            <div id="content-page" className="content-page">
                <div className="container">
                    <GroupList />
                </div>
            </div>
        </div>
    );
};

export default Groups;