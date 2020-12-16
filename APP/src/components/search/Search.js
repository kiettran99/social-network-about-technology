import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchUsers } from '../../actions/search';

const Search = ({ search: { users }, searchUsers }) => {

    useEffect(() => {
        if (!users) {
            searchUsers('');
        }
    }, [users]);

    // Auto Sroll on Top, when component did mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Search</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        {users && (
                            users.length >= 0 && users.length === 0 ?
                                (
                                    <>
                                        <div className='text-center text-muted mt-5'>
                                            <h1 className=''>NO results found</h1>
                                        </div>

                                        <div className='text-center ma-4'>
                                            <p className='text-muted'>
                                                Try adjusting your search or filter to find what you're looking for.
                                            </p>

                                            <Link to='/' className='btn btn-outline-primary'>Go Back Home</Link>
                                        </div>
                                    </>
                                ) :
                                users.map(user => (
                                    <div className="iq-card" key={user._id}>
                                        <div className="iq-card-body">
                                            <ul className="notification-list m-0 p-0">
                                                <li className="d-flex align-items-center">
                                                    <div className="user-img img-fluid"><img src={user.avatar} alt="story-img" className="rounded-circle avatar-40" /></div>
                                                    <div className="media-support-info ml-3">
                                                        <h6 className="mb-0 text-primary"><Link to={`/profile/${user._id}`}>{user.fullname}</Link></h6>
                                                        <p className="mb-0">{user.email && `· ${user.email}`}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                    <div className="col-sm-12 text-center">
                        {/* {notification && <NotificationProcess />} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    search: state.search
});

export default connect(mapStateToProps, { searchUsers })(Search);