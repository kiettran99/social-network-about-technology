import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestFriend, acceptFriend, unAcceptFriend } from '../../../actions/friend';

const RequestItem = ({ request: { _id: userId, fullname, avatar, friendsStatus },
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
        <li className="d-flex align-items-center">
            <div className="user-img img-fluid"><img src={avatar} alt="story-img" className="rounded-circle avatar-40" /></div>
            <div className="media-support-info ml-3">
                <h6><Link to={`/profile/${userId}`}>{fullname}</Link></h6>
                {/* <p className="mb-0">40  friends</p> */}
            </div>
            <div className="d-flex align-items-center">
               {getStatus()}
            </div>
        </li>
    );
};

export default connect(null, { acceptFriend, unAcceptFriend, requestFriend })(RequestItem);