import React from 'react';
import { useSelector } from 'react-redux';

import dayjs from '../../../../utils/relativeDate';

import UserDetail from './user-detail/UserDetail';

const Header = () => {

    const userProfile = useSelector((state) => {
        return state.chat.userProfile
    });

    return (
        <div className="chat-head">
            <header className="d-flex justify-content-between align-items-center bg-white pt-3 pr-3 pb-3">
                <div className="d-flex align-items-center">
                    <div className="sidebar-toggle">
                        <i className="ri-menu-3-line" />
                    </div>
                    {userProfile && (
                        <>
                            <div className="avatar chat-user-profile m-0 mr-3">
                                <img src={userProfile.avatar} alt="avatar" className="avatar-50 rounded-circle" />
                                {userProfile.available && (
                                    <span className="avatar-status"><i className="ri-checkbox-blank-circle-fill text-success" /></span>
                                )}
                            </div>
                            <div>
                                <h5 className="mb-0">{userProfile.fullname}</h5>

                                {userProfile.available ? (
                                    <small className="">Active Now</small>
                                ) : (
                                    <small className="">Active {dayjs(userProfile.updatedAt).fromNow()}</small>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <UserDetail userProfile={userProfile} />
                <div className="chat-header-icons d-flex">
                    <a href="javascript:void();" className="chat-icon-phone iq-bg-primary">
                        <i className="ri-phone-line" />
                    </a>
                    <a href="javascript:void();" className="chat-icon-video iq-bg-primary">
                        <i className="ri-vidicon-line" />
                    </a>
                    <a href="javascript:void();" className="chat-icon-delete iq-bg-primary">
                        <i className="ri-delete-bin-line" />
                    </a>
                    <span className="dropdown iq-bg-primary">
                        <i className="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer pr-0" id="dropdownMenuButton02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu" />
                        <span className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton02">
                            <a className="dropdown-item" href="JavaScript:void(0);"><i className="fa fa-thumb-tack" aria-hidden="true" /> Pin to top</a>
                            <a className="dropdown-item" href="JavaScript:void(0);"><i className="fa fa-trash-o" aria-hidden="true" /> Delete chat</a>
                            <a className="dropdown-item" href="JavaScript:void(0);"><i className="fa fa-ban" aria-hidden="true" /> Block</a>
                        </span>
                    </span>
                </div>
            </header>
        </div>
    );
};

export default Header;