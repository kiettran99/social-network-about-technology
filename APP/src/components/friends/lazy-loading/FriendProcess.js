import React from 'react';
import { connect } from 'react-redux';

import Process from './Process';
import { getMoreFriends } from '../../../actions/friend';

const FriendProcess = ({ friend: { friends: { length }, loading }, getMoreFriends }) => {

    const props = {
        length,
        loading,
        actionDispatch: getMoreFriends
    };

    return <Process {...props} />
};

const mapStateToProps = (state) => ({
    friend: state.friend
});

export default connect(mapStateToProps, { getMoreFriends })(FriendProcess);

