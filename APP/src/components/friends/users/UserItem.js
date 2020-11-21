import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestFriend, unAcceptFriend } from '../../../actions/friend';

const UserItem = ({ user: { _id: userId, fullname, avatar, friendsStatus },
    requestFriend, unAcceptFriend
}) => {
    return (
        <li className="d-flex align-items-center">
            <div className="user-img img-fluid"><img src={avatar} alt="story-img" className="rounded-circle avatar-40" /></div>
            <div className="media-support-info ml-3">
                <h6><Link to={`/profile/${userId}`}>{fullname}</Link></h6>
                {/* <p className="mb-0">40  friends</p> */}
            </div>
            <div className="d-flex align-items-center">
                {friendsStatus === 0 ? (
                    <a className="mr-3 btn btn-primary rounded text-light"
                        onClick={() => requestFriend(userId, 'users')}>Add Friend</a>
                ) : (
                        <>
                            <p className="mr-3 text-muted m-auto"><i class="ri-check-line text-success"></i>&nbsp;Pending</p>
                            <a className="mx-3 mr-3 btn btn-secondary rounded text-light"
                                onClick={() => unAcceptFriend(userId, 'users')}>Delete Request</a>
                        </>
                    )}
                {/* <a className="mr-3 btn btn-secondary rounded"
                    onClick={() => unAcceptFriend(_id)} >Delete Request</a> */}
            </div>
        </li>
    );
};

export default connect(null, { requestFriend, unAcceptFriend })(UserItem);