import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { followingNotification, unfollowingNotification } from '../../../actions/notification';

const Following = ({ postId, notification: { notification, loading },
    followingNotification, unfollowingNotification }) => {

    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (notification && !loading) {
            if (notification.followingPosts.includes(postId)) {
                setIsFollowed(true);
            }
        }
    }, [notification, loading]);

    const onFollowingHandler = () => {
        if (isFollowed) {
            unfollowingNotification(postId);
            setIsFollowed(false);
        }
        else {
            followingNotification(postId);
            setIsFollowed(true);
        }

    }

    return !loading && (
        <a className="dropdown-item p-3" onClick={() => onFollowingHandler()}>
            <div className="d-flex align-items-top">
                <div className="icon font-size-20"><i className={`ri-notification-line ${isFollowed && 'text-primary'}`} /></div>
                <div className="data ml-2">
                    <h6>Notifications</h6>
                    <p className="mb-0">Turn {isFollowed ? 'off' : 'on'} notifications for this post</p>
                </div>
            </div>
        </a>
    );
};

const mapStateToProps = (state) => ({
    notification: state.notification
});

export default connect(mapStateToProps, { followingNotification, unfollowingNotification })(Following);