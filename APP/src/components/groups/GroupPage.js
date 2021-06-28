import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGroup } from '../../actions/group';

import GroupProfile from './GroupProfile';
import CreatePost from '../post/CreatePost';
import PostsPage from '../post/PostsPage';
import HeaderBackground from './header/HeaderBackground';
import Process from './Process';
import GroupToolbar from './group-toolbar/GroupToolbar';
import About from './about/About';

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
                            <About />
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