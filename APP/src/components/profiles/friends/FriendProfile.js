import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFriendsById } from '../../../actions/friend';

const FriendProfile = ({ match, getFriendsById,
    friend: { friends }
}) => {

    useEffect(() => {
        getFriendsById(match.params.id);
    }, [match, getFriendsById]);

    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Friends</h4>
                </div>
                <div className="iq-card-header-toolbar d-flex align-items-center">
                    {/* <p className="m-0"><a href="javacsript:void();">Add New </a></p> */}
                </div>
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