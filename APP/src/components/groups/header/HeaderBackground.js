import React from 'react';

const HeaderBackground = ({ title = '', imageUrl = '' }) => {
    return (
        <div className="header-for-bg">
            <div className="background-header position-relative">
                <img src={imageUrl} className="img-fluid w-100 rounded rounded" alt="header-bg" />
                <div className="title-on-header">
                    <div className="data-block">
                        <h2>{title}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HeaderBackground;