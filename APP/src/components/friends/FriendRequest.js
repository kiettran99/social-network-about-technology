import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetFriend } from '../../actions/friend';
import RequestsList from './requests/RequestsList';
import UsersList from './users/UsersList';

const FriendRequest = ({ resetFriend }) => {

    useEffect(() => {
        return () => resetFriend();
    }, []);

    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">Friend Request</h4>
                                </div>
                            </div>
                            <div className="iq-card-body">
                                <RequestsList />
                            </div>
                        </div>
                        <div className="iq-card">
                            <div className="iq-card-header d-flex justify-content-between">
                                <div className="iq-header-title">
                                    <h4 className="card-title">People You May Know</h4>
                                </div>
                            </div>
                            <div className="iq-card-body">
                                <UsersList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { resetFriend })(FriendRequest);