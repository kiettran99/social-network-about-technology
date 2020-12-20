import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestFriend, acceptFriend, unAcceptFriend } from '../../../actions/friend';

const FriendRequest = ({ request: { _id: userId, fullname, avatar, friendsStatus },
    acceptFriend, unAcceptFriend, requestFriend
}) => {

    const getStatus = () => {
        if (friendsStatus === 0) {
            return (
                <a className="mr-3 btn btn-primary rounded text-light"
                    onClick={() => requestFriend(userId, 'users')}>Add Friend</a>
            );
        }
        else if (friendsStatus === 1) {
            return (
                <>
                    <a className="mr-3 btn btn-primary rounded text-light"
                        onClick={() => acceptFriend(userId, 'requests')}>Confirm</a>
                    <a className="mr-3 btn btn-secondary rounded text-light"
                        onClick={() => unAcceptFriend(userId, 'requests')} >Delete Request</a>
                </>
            );
        } else {
            return (
                <>
                    <p className="mr-3 text-muted m-auto"><i class="ri-check-line text-success"></i>&nbsp;Friend</p>
                    <a className="mx-3 mr-3 btn btn-secondary rounded text-light"
                        onClick={() => unAcceptFriend(userId, 'users')}>UnFriend</a>
                </>
            )
        }
    }

    return (
        <div className="iq-friend-request">
            <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div className="">
                        <img className="avatar-40 rounded" src={avatar} alt="" />
                    </div>
                    <div className="media-body ml-3">
                        <h6><Link to={`/profile/${userId}`}>{fullname}</Link></h6>
                        {/* <p className="mb-0">40  friends</p> */}
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    {getStatus()}
                </div>
            </div>
        </div>
    );
};

export default connect(null, { acceptFriend, unAcceptFriend, requestFriend })(FriendRequest);