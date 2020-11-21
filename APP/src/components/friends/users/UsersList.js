import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserItem from './UserItem';
import { getUsers } from '../../../actions/friend';

const UserList = ({ friend: { users, loading }, getUsers }) => {

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <ul className="request-list m-0 p-0">
            {!loading && users && users.length > 0 && users.map(user => (
                <UserItem key={user._id} user={user} />
            ))}
        </ul>
    );
};

UserList.propTypes = {
    friend: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    friend: state.friend
});

export default connect(mapStateToProps, { getUsers })(UserList);