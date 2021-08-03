import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import dayjs from '../../../../utils/relativeDate';
import UserDetail from './user-detail/UserDetail';

const DialogBox = React.lazy(() => import('../../../shared/DialogBox'));
const ReportUser = React.lazy(() => import('../../../shared/report/ReportUser'));

const Header = ({ blockUser, removeMessages, match }) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const userProfile = useSelector((state) => {
        return state.chat.userProfile
    });

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <div className="chat-head">
            <header className="d-flex justify-content-between align-items-center bg-white py-3 px-0 px-sm-3">
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
                    {/* <a href="#!" className="chat-icon-phone iq-bg-primary">
                        <i className="ri-phone-line" />
                    </a>
                    <a href="#!" className="chat-icon-video iq-bg-primary">
                        <i className="ri-vidicon-line" />
                    </a>
                    <a href="#!" className="chat-icon-delete iq-bg-primary">
                        <i className="ri-delete-bin-line" />
                    </a> */}
                    <span className="dropdown iq-bg-primary">
                        <i className="ri-more-2-line cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer pr-0" id="dropdownMenuButton02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu" />
                        <span className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton02">
                            {/* <a className="dropdown-item" href="#!"><i className="fas fa-thumb-tack" aria-hidden="true" /> Pin to top</a> */}
                            <a className="dropdown-item text-danger"
                                onClick={removeMessages}><i className="ri-delete-bin-7-line" aria-hidden="true" /> Delete chat</a>
                            <a className="dropdown-item text-danger"
                                onClick={blockUser}><i className="ri-user-unfollow-line" aria-hidden="true" /> Block User</a>
                            <a className="dropdown-item"
                                onClick={() => openModal()}><i className="fas fa-ban" aria-hidden="true" /> Report</a>
                        </span>
                    </span>
                </div>
            </header>
            <React.Suspense fallback={<div></div>}>
                <DialogBox props={{ modalIsOpen, closeModal, openModal, userId: match.params?.id }} Component={ReportUser} />
            </React.Suspense>
        </div>
    );
};

export default React.memo(Header);