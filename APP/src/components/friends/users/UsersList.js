import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserItem from './UserItem';
import { getUsers, getMoreUsers } from '../../../actions/friend';

const UserList = ({ friend: { users, loading }, getUsers, getMoreUsers }) => {

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const isExistsUsers = () => !loading && users && users.length > 0;

    return (
        <>
            <ul className="request-list m-0 p-0">
                {isExistsUsers() && users.map(user => (
                    <UserItem key={user._id} user={user} />
                ))}
            </ul>
            {isExistsUsers() && (
                <div className="text-center">
                    <button className="mr-3 btn text-primary btn-link"
                        onClick={() => getMoreUsers(users.length)}
                    >View more users</button>
                </div>
            )}
        </>
    );
};

UserList.propTypes = {
    friend: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    getMoreUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    friend: state.friend
});

export default connect(mapStateToProps, { getUsers, getMoreUsers })(UserList);