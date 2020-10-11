import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { followingNotification, unfollowingNotification } from '../../../actions/notification';

const Following = ({ productId, notification: { notification, loading },
    followingNotification, unfollowingNotification }) => {

    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (notification && !loading) {
            if (notification.followingPosts.includes(productId)) {
                setIsFollowed(true);
            }
        }
    }, [notification, loading]);

    const onFollowingHandler = () => {
        if (isFollowed) {
            unfollowingNotification(productId);
            setIsFollowed(false);
        }
        else {
            followingNotification(productId);
            setIsFollowed(true);
        }

    }

    return !loading && (
        <button className="btn text-secondar"
            onClick={() => onFollowingHandler()}
        ><span className={`${isFollowed ? 'text-primary' : ''}`}>{isFollowed ? "Unfollowing " : "Following "}<i className="fas fa-level-up-alt"></i></span></button>
    );
};

const mapStateToProps = (state) => ({
    notification: state.notification
});

export default connect(mapStateToProps, { followingNotification, unfollowingNotification })(Following);