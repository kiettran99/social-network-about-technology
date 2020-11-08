import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPost } from '../../actions/post';

import UserPost from './UserPost';
import Stories from '../home/Stories';
import Events from '../home/Events';
import UpcomingBirthday from '../home/UpcomingBirthday';
import SuggestedPages from '../home/SuggestedPages';

const PostDetail = ({ match, history, post: { post, loading }, getPost }) => {

    useEffect(() => {
        getPost(match.params.id, history);
    }, [match.params.id]);

    // Auto Sroll on Top, when component did mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div id="content-page" className="content-page" >
        <div className="container">
            <div className="row">
                <div className="col-lg-8 row m-0 p-0">
                    {!loading && post && <UserPost post={post} />}
                </div>
                <div className="col-lg-4">
                    <Stories />
                    <Events />
                    <UpcomingBirthday />
                    <SuggestedPages />
                </div>
            </div>
        </div>
    </div >
};

PostDetail.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(withRouter(PostDetail));
