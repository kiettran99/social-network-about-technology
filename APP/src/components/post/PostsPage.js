import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';
import UserPost from './UserPost';
import { withRouter } from 'react-router-dom';

const PostsPage = ({ post: { posts, loading }, getPosts, history }) => {

    useEffect(() => {
        getPosts();
    }, []);

    return !loading && (
        posts.map(post => (
            <div key={post._id} className="col-sm-12" onClick={() => history.push(`/posts/${post._id}`)}>
                <UserPost post={post} />
            </div>
        ))
    );
};

PostsPage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(withRouter(PostsPage));

