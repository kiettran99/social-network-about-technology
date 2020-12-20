import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRequests } from '../../../actions/friend';
import FriendRequest from './FriendRequest';

const FriendsRequest = ({ friend: { requests, loading }, auth: { user, isAuthenticated }, getRequests }) => {

    useEffect(() => {
        getRequests(0, 3);
    }, [user, isAuthenticated]);

    return (
        <li className="nav-item d-none d-sm-block">
            <a className="search-toggle iq-waves-effect" href="index.html#"><i className="ri-group-line" /></a>
            <div className="iq-sub-dropdown iq-sub-dropdown-large">
                <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0 ">
                        <div className="bg-primary p-3">
                            <h5 className="mb-0 text-white">Friend Request<small className="badge  badge-light float-right pt-1">{requests.length || 0}</small></h5>
                        </div>
                        {!loading && requests && requests.length > 0 && requests.map(request => (
                            <FriendRequest key={request._id} request={request} />
                        ))}
                        <div className="text-center">
                            <Link to="/friend-request" className="mr-3 btn text-primary">View More Request</Link>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

const mapStateToProps = (state) => ({
    friend: state.friend,
    auth: state.auth
});

export default connect(mapStateToProps, { getRequests })(FriendsRequest);