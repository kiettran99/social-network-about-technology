import React from 'react';
import PersonalProfile from './PersonalProfile';

const Profile = ({ match }) => {
    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <PersonalProfile match={match} />
                        <div className="iq-card">
                            <div className="iq-card-body p-0">
                                <div className="user-tabing">
                                    <ul className="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                                        <li className="col-sm-3 p-0">
                                            <a className="nav-link active" data-toggle="pill" href="profile.html#timeline">Timeline</a>
                                        </li>
                                        <li className="col-sm-3 p-0">
                                            <a className="nav-link" data-toggle="pill" href="profile.html#about">About</a>
                                        </li>
                                        <li className="col-sm-3 p-0">
                                            <a className="nav-link" data-toggle="pill" href="profile.html#friends">friends</a>
                                        </li>
                                        <li className="col-sm-3 p-0">
                                            <a className="nav-link" data-toggle="pill" href="profile.html#photos">Photos</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;