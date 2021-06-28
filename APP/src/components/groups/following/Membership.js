import React from 'react';

import { connect } from 'react-redux';

import { joinGroup } from '../../../actions/group';

const Membership = ({ groupId, isJoinedGroup, onHandleUnjoinGroup, joinGroup }) => {

    const handleClick = () => {
        if (isJoinedGroup) {
            return onHandleUnjoinGroup();
        }

        joinGroup(groupId);
    }

    return (
        <a className="dropdown-item p-3" onClick={handleClick}>
            <div className="d-flex align-items-top">
                <div className="icon font-size-20"><i className="ri-pencil-line" /></div>
                <div className="data ml-2">
                    <h6>{isJoinedGroup ? 'Unfollowing' : 'Folowing'}</h6>
                    <p className="mb-0">Follow or unfollow groups to control what you see in News Feed.</p>
                </div>
            </div>
        </a>
    );
};

export default connect(null, { joinGroup })(React.memo(Membership));