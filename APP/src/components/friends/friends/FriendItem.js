import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestFriend, acceptFriend, unAcceptFriend } from '../../../actions/friend';

const FriendItem = ({ friend: { _id: userId, fullname, avatar, email, friendsStatus },
    acceptFriend, unAcceptFriend, requestFriend
}) => {

    const getStatus = () => {
        if (friendsStatus === 0) {
            return (
                <button className="mr-3 btn btn-primary rounded text-light"
                    onClick={() => requestFriend(userId, 'friends')}>Add Friend</button>
            );
        }
        else if (friendsStatus === 1) {
            return (
                <>
                    <button className="mr-3 btn btn-primary rounded text-light"
                        onClick={() => acceptFriend(userId, 'friends')}>Confirm</button>
                    <button className="mr-3 btn btn-secondary rounded text-light"
                        onClick={() => unAcceptFriend(userId, 'friends')} >Delete Request</button>
                </>
            );
        } else {
            return (
                <>
                    <span className="mr-3 text-muted m-auto"><i class="ri-check-line text-success"></i>&nbsp;Friend</span>
                    <button className="mx-3 mr-3 btn btn-secondary rounded text-light"
                        onClick={() => unAcceptFriend(userId, 'friends')}>UnFriend</button>
                </>
            )
        }
    };

    return (
        <div className="col-md-6">
            <div className="iq-card">
                <div className="iq-card-body profile-page p-0">
                    <div className="profile-header-image">
                        <div className="cover-container">
                            <img src="/images/page-img/profile-bg6.jpg" alt="profile-bg" className="rounded img-fluid w-100" />
                        </div>
                        <div className="profile-info p-4">
                            <div className="user-detail">
                                <div className="d-flex flex-wrap justify-content-between align-items-start">
                                    <div className="profile-detail d-flex">
                                        <div className="profile-img pr-4">
                                            <img src={avatar} alt="profile-img" className="avatar-130 img-fluid" />
                                        </div>
                                        <div className="user-data-block">
                                            <h4><Link to={`/profile/${userId}`}>{fullname}</Link></h4>
                                            <h6>{email}</h6>
                                            <p>Lorem Ipsum is simply dummy text of the</p>
                                        </div>
                                    </div>

                                    <div>
                                        {getStatus()}
                                        <button type="submit" className="btn btn-primary">Following</button>
                                    </div>                           
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { acceptFriend, unAcceptFriend, requestFriend })(FriendItem);