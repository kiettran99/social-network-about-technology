import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { unjoinGroup } from '../../../actions/group';
import Edit from '../edit/Edit';
import Following from '../following/Following';
import Membership from '../following/Membership';

const DialogBox = React.lazy(() => import('../../shared/DialogBox'));

const GroupToolbar = ({ unjoinGroup }) => {

    const { isAuthenticated, user, group } = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        group: state.group.group
    }));

    const [isJoinedGroup, setIsJoinedGroup] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user && group) {
            const isMembered = group?.members.filter(member => member.user._id === user._id).length > 0;

            setIsJoinedGroup(isMembered);
        }
    }, [isAuthenticated, user, group]);


    const onHandleUnjoinGroup = () => {

        const confirm = window.confirm("Are you sure to unjoin a group ? You'll re-join if you want to follow ?");

        if (confirm && isJoinedGroup) {
            setIsJoinedGroup(false);
            return unjoinGroup(group._id);
        }
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="header-title">
                    <h4 className="iq-card-title">Groups</h4>
                </div>
                {isAuthenticated && (
                    <div className="iq-card-post-toolbar">
                        <div className="dropdown">
                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                <i className="ri-more-fill" />
                            </span>
                            <div className="dropdown-menu m-0 p-0">
                                <Following groupId={group._id} />
                                {group && user && group.owner === user._id && (
                                    <>
                                        <a className="dropdown-item p-3" onClick={() => openModal()}>
                                            <div className="d-flex align-items-top">
                                                <div className="icon font-size-20"><i className="ri-edit-box-line" /></div>
                                                <div className="data ml-2">
                                                    <h6>Edit Group</h6>
                                                    <p className="mb-0">Update infomation for group.</p>
                                                </div>
                                            </div>
                                        </a>

                                        <Membership groupId={group._id}
                                            isJoinedGroup={isJoinedGroup}
                                            onHandleUnjoinGroup={onHandleUnjoinGroup} />
                                    </>
                                )}
                                {isJoinedGroup && group && user && group.owner !== user._id && (
                                    <a className="dropdown-item p-3" onClick={onHandleUnjoinGroup}>
                                        <div className="d-flex align-items-top">
                                            <div className="icon font-size-20"><i className="ri-close-circle-line" /></div>
                                            <div className="data ml-2">
                                                <h6>Membership</h6>
                                                <p className="mb-0">Leave groups that no longer interest you.</p>
                                            </div>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="iq-card-body">
                <ul className="list-inline p-0 m-0">
                    {/* <li className="mb-3 pb-3 border-bottom">
                        <div className="iq-search-bar members-search p-0">
                            <form action="group-detail.html#" className="searchbox w-auto">
                                <input type="text" className="text search-input bg-grey" placeholder="Type here to search..." />
                                <a className="search-link" href="group-detail.html#"><i className="ri-search-line" /></a>
                            </form>
                        </div>
                    </li> */}
                    <li className="mb-3 d-flex align-items-center">
                        <div className="avatar-40 rounded-circle bg-grey text-center mr-3"><i className="ri-bank-card-line font-size-20" /></div>
                        <h6 className="mb-0">Your Feed</h6>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                        <div className="avatar-40 rounded-circle bg-grey text-center mr-3"><i className="ri-compass-3-line font-size-20" /></div>
                        <h6 className="mb-0">Discover</h6>
                    </li>
                </ul>
            </div>
            <React.Suspense fallback={<div></div>}>
                <DialogBox props={{ modalIsOpen, closeModal, openModal }} Component={Edit} />
            </React.Suspense>
        </div>
    );
};

export default connect(null, { unjoinGroup })(GroupToolbar);