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
import GroupToolbar from './group-toolbar/GroupToolbar';

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
                            <GroupToolbar />
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
                                        <li>
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