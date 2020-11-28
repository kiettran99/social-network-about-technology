import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getGroup } from '../../actions/group';
import GroupProfile from './GroupProfile';
import CreatePost from '../post/CreatePost';
import PostsPage from '../post/PostsPage';
import HeaderBackground from './header/HeaderBackground';
import Process from './Process';

const GroupPage = ({ match, getGroup, group: { group, loading } }) => {

    useEffect(() => {
        getGroup(match.params.id);
    }, [match.params.id]);

    return !loading && group && (
        <>
            <HeaderBackground title='Groups' imageUrl={group.wallpaper} />
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <GroupProfile group={group} />
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-sm-12">
                                    <CreatePost type={{ groupId: group._id }} />
                                </div>
                                <PostsPage groupId={group._id} />
                                <div className="col-sm-12 text-center">
                                    <Process groupId={group._id} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="iq-card-title">Groups</h4>
                                    </div>
                                    <div className="iq-card-post-toolbar">
                                        <div className="dropdown">
                                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">
                                                <i className="ri-more-fill" />
                                            </span>
                                            <div className="dropdown-menu m-0 p-0">
                                                <a className="dropdown-item p-3" href="group-detail.html#">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="ri-notification-line" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Notifications</h6>
                                                            <p className="mb-0">Turn on notifications for this post</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item p-3" href="group-detail.html#">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="ri-save-line" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Pins</h6>
                                                            <p className="mb-0">Pin your favourite groups for quick access.</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item p-3" href="group-detail.html#">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="ri-pencil-line" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Following</h6>
                                                            <p className="mb-0">Follow or unfollow groups to control what you see in News Feed.</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a className="dropdown-item p-3" href="group-detail.html#">
                                                    <div className="d-flex align-items-top">
                                                        <div className="icon font-size-20"><i className="ri-close-circle-line" /></div>
                                                        <div className="data ml-2">
                                                            <h6>Membership</h6>
                                                            <p className="mb-0">Leave groups that no longer interest you.</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <ul className="list-inline p-0 m-0">
                                        <li className="mb-3 pb-3 border-bottom">
                                            <div className="iq-search-bar members-search p-0">
                                                <form action="group-detail.html#" className="searchbox w-auto">
                                                    <input type="text" className="text search-input bg-grey" placeholder="Type here to search..." />
                                                    <a className="search-link" href="group-detail.html#"><i className="ri-search-line" /></a>
                                                </form>
                                            </div>
                                        </li>
                                        <li className="mb-3 d-flex align-items-center">
                                            <div className="avatar-40 rounded-circle bg-grey text-center mr-3"><i className="ri-bank-card-line font-size-20" /></div>
                                            <h6 className="mb-0">Your Feed</h6>
                                        </li>
                                        <li className="mb-3 d-flex align-items-center">
                                            <div className="avatar-40 rounded-circle bg-grey text-center mr-3"><i className="ri-compass-3-line font-size-20" /></div>
                                            <h6 className="mb-0">Discover</h6>
                                        </li>
                                        <li>
                                            <button type="submit" className="btn btn-primary d-block w-100"><i className="ri-add-line pr-2" />Create New Group</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="iq-card-title">About</h4>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <ul className="list-inline p-0 m-0">
                                        <li className="mb-3">
                                            <p className="mb-0">Developer's Group...</p>
                                        </li>
                                        <li className="mb-3">
                                            <h6><i className="ri-lock-fill pr-2" />Private</h6>
                                            <p className="mb-0 pl-4">Success in slowing economic activity.</p>
                                        </li>
                                        <li className="mb-3">
                                            <h6><i className="ri-eye-fill pr-2" />Visible</h6>
                                            <p className="mb-0 pl-4">Various versions have evolved over the years</p>
                                        </li>
                                        <li className>
                                            <h6><i className="ri-group-fill pr-2" />General group</h6>
                                            <p className="mb-0 pl-4">There are many variations of passages</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

GroupPage.propTypes = {
    group: PropTypes.object.isRequired,
    getGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    group: state.group
});

export default connect(mapStateToProps, { getGroup })(GroupPage);