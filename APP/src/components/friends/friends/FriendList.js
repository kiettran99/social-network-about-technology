import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FriendItem from './FriendItem';
import { getFriends } from '../../../actions/friend';
import FriendProcess from  '../lazy-loading/FriendProcess';

const FriendList = ({ friend: { friends, loading }, getFriends }) => {

    useEffect(() => {
        getFriends();
    }, [getFriends]);

    return (
        <div className="row">
            {!loading && friends && friends.length > 0 && friends.map(friend => (
                <FriendItem key={friend._id} friend={friend} />
            ))}
            <div className="col-sm-12 text-center">
               <FriendProcess />
            </div>
        </div >
    );
};

FriendList.propTypes = {
    friend: PropTypes.object.isRequired,
    getFriends: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    friend: state.friend
});

export default connect(mapStateToProps, { getFriends })(FriendList);