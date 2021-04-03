import React from 'react';

const UserDetail = ({ userProfile }) => {

    return (
        <div className="chat-user-detail-popup scroller">
            {userProfile && (
                <div className="user-profile text-center">
                    <button type="submit" className="close-popup p-3"><i className="ri-close-fill" /></button>
                    <div className="user mb-4">
                        <a className="avatar m-0">
                            <img className="img-fluid avatar-70 rounded-circle" src={userProfile.avatar} alt="avatar" />
                        </a>
                        <div className="user-name mt-4">
                            <h4>{userProfile.fullname}</h4>
                        </div>
                        <div className="user-desc">
                            <p>{userProfile.country}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="chatuser-detail text-left mt-4">
                        <div className="row">
                            <div className="col-4 col-md-4 title">Bni Name:</div>
                            <div className="col-8 col-md-8 text-right">{userProfile.fullname}</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-4 col-md-4 title">Email:</div>
                            <div className="col-8 col-md-8 text-right">{userProfile.email}</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-4 col-md-4 title">Date Of Birth:</div>
                            <div className="col-8 col-md-8 text-right">July 12, 1989</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-4 col-md-4 title">Gender:</div>
                            <div className="col-8 col-md-8 text-right">{userProfile.gender === 'm' ? 'Male': 'Female'}</div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default UserDetail;