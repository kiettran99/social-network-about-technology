import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { followingFriend, unFollowingFriend } from '../../../actions/notification';

const Following = ({ userId, followingFriend, unFollowingFriend }) => {

    const [status, setStatus] = useState(false);

    const { notification, loading } = useSelector((state) => {
        return state.notification
    });

    useEffect(() => {
        if (notification && notification.followingFriends) {
            const isFollowing = notification.followingFriends.find(friend => friend === userId);
            setStatus(!!isFollowing);
        }
    }, [notification, userId]);

    const onHandleUnFollowing = (userId) => {
        if (status) {
            unFollowingFriend(userId);
            setStatus(false);
        }
        else {
            followingFriend(userId);
            setStatus(true);
        }
    }

    return !loading && (
        <>
            <button type="button" className="btn btn-primary"
                onClick={() => onHandleUnFollowing(userId)}>{status ? 'Unfollowing': 'Following'}</button>
        </>
    );
};

export default connect(null, { followingFriend, unFollowingFriend })(Following);