import React from 'react';
import { connect } from 'react-redux';

const AboutProfile = ({ profile: { profile } }) => {
    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="header-title">
                    <h4 className="iq-card-title">About</h4>
                </div>
            </div>
            <div className="iq-card-body">
                {profile && (
                    <ul className="list-inline p-0 m-0">
                        <li className="mb-2 d-flex align-items-center">
                            <i className="ri-user-line pr-3 font-size-20" />
                            <p className="mb-0">{profile.job}</p>
                        </li>
                        <li className="mb-2 d-flex align-items-center">
                            <i className="ri-mail-line pr-3 font-size-20" />
                            <p className="mb-0">{profile.user.email}</p>
                        </li>
                        <li className="mb-2 d-flex align-items-center">
                            <i className="ri-map-pin-line pr-3 font-size-20" />
                            <p className="mb-0">{profile.user.country}</p>
                        </li>
                        <li className="d-flex align-items-center">
                            <i className="ri-service-line pr-3 font-size-20" />
                            <p className="mb-0">{profile.user.gender === 'm' ? 'Male' : 'Female'}</p>
                        </li>
                        <li className="d-flex align-items-center">
                            <i className="ri-heart-line pr-3 font-size-20" />
                            <p className="mb-0">{profile.maritalStatus}</p>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps)(AboutProfile);