import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFriendsById } from '../../../actions/friend';

const FriendProfile = ({ match, getFriendsById,
    friend: { friends }
}) => {

    const auth = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }));

    useEffect(() => {
        getFriendsById(match.params.id);
    }, [match, getFriendsById]);

    const editFriends = useMemo(() => {
        return match && auth && auth.user && auth.isAuthenticated
            && auth.user._id === match.params.id;
    }, [match, auth]);

    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Friends</h4>
                </div>
                {editFriends && (
                    <div className="iq-card-header-toolbar d-flex align-items-center">
                        <Link to='/friend-list' data-toggle="tooltip" title="Edit Friends">
                            <i className="ri-edit-2-fill" />
                        </Link>
                    </div>
                )}
            </div>
            <div className="iq-card-body">
                <ul className="profile-img-gallary d-flex flex-wrap p-0 m-0">
                    {friends && friends.length > 0 && friends.map(friend => (
                        <li key={friend._id} className="col-md-4 col-6 pl-2 pr-0 pb-3">
                            <Link to={`/profile/${friend._id}`}>
                                <img src={friend.avatar} alt="gallary-image" className="img-fluid" /></Link>
                            <h6 className="mt-2">{friend.name}</h6>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

FriendProfile.propTypes = {
    getFriendsById: PropTypes.func.isRequired,
    friend: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    friend: state.friend
});

export default connect(mapStateToProps, { getFriendsById })(FriendProfile);