import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';
import UserPost from './UserPost';

const PostsPage = ({ post: { posts, loading }, getPosts }) => {

    useEffect(() => {
        getPosts();
    }, []);

    return !loading && (
        posts.map(post => (
            <div className="col-sm-12">
                <UserPost key={post._id} post={post} />
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

export default connect(mapStateToProps, { getPosts })(PostsPage);

