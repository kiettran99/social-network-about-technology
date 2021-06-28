import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import DialogBox from '../shared/DialogBox';
import InviteUser from '../shared/InviteUser';
import { inviteGroup, joinGroup } from '../../actions/group';

const GroupProfile = ({ group: { _id, name, avatar, lengthOfMembers, members = [], isPublic },
    inviteGroup, joinGroup
}) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const { isAuthenticated, user } = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }));

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const isJoinedGroup = () => {
        return members.some(member => member.user._id === user._id);
    }

    const onHandleJoinGroup = () => {
        joinGroup(_id);
    }

    return (
        <>
            <div className="col-lg-12">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="group-info d-flex align-items-center">
                        <div className="mr-3">
                            <img className="rounded-circle img-fluid avatar-100" src={avatar} alt="" />
                        </div>
                        <div className="info">
                            <h4>{name}</h4>
                            <p className="mb-0">
                                <i className="las la-users pr-2" /> {isPublic ? 'Public ' : 'Private '}Group . {lengthOfMembers} members
                            </p>
                        </div>
                    </div>
                    <div className="group-member d-flex align-items-center">
                        <div className="iq-media-group mr-3">
                            {members.length > 0 && members.map(member => (
                                <Link to={`/profile/${member.user._id}`} className="iq-media" key={member._id}>
                                    <img className="img-fluid avatar-40 rounded-circle" src={member.user.avatar} alt="" />
                                </Link>
                            ))}
                        </div>
                        {isAuthenticated && isJoinedGroup() ? (
                            <button type="button" className="btn btn-primary mb-2"
                                onClick={() => setIsOpen(true)}>
                                <i className="ri-add-line" />Invite</button>
                        ) : (
                            <button type="button" className="btn btn-primary mb-2"
                                onClick={() => onHandleJoinGroup()}>
                                <i className="ri-add-line" />Join</button>
                        )}
                    </div>
                </div>
            </div>
            <DialogBox props={{
                modalIsOpen, closeModal, openModal,
                configs: {
                    title: 'Invite Friends to Join Group',
                    type: 'GROUP',
                    action: (selectedUsers, setMessage, setWating) => {
                        setWating(true);

                        inviteGroup(_id, selectedUsers, (message, type) => {
                            setMessage(message);
                            setWating(false);

                            setTimeout(() => {
                                if (type) {
                                    closeModal();
                                }
                            }, 1500);
                        });
                    }
                }
            }} Component={InviteUser} />
        </>
    );
};

export default connect(null, { inviteGroup, joinGroup })(GroupProfile);