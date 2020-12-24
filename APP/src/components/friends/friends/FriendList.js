import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FriendItem from './FriendItem';
import { getFriends, resetFriend } from '../../../actions/friend';
import FriendProcess from '../lazy-loading/FriendProcess';

const FriendList = ({ friend: { friends, loading }, getFriends,
    resetFriend
}) => {

    useEffect(() => {
        getFriends();
        return () => resetFriend();
    }, [getFriends]);

    const isExistsFriends = () => !loading && friends && friends.length > 0;

    return (
        <div className="row">
            { isExistsFriends() && friends.map(friend => (
                <FriendItem key={friend._id} friend={friend} />
            ))}
            {isExistsFriends() && (
                <div className="col-sm-12 text-center">
                    <FriendProcess />
                </div>
            )}
        </div >
    );
};

FriendList.propTypes = {
    friend: PropTypes.object.isRequired,
    getFriends: PropTypes.func.isRequired,
    resetFriend: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    friend: state.friend
});

export default connect(mapStateToProps, { getFriends, resetFriend })(FriendList);