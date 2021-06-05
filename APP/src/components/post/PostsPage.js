import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPosts, resetPost, assignPost, updatePostsById } from '../../actions/post';
import { connect } from 'react-redux';
import UserPost from './UserPost';
import { withRouter } from 'react-router-dom';

const PostsPage = ({ post: { posts, post, isInPosts, loading }, getPosts, resetPost,
    history, groupId = '', match, assignPost, updatePostsById
}) => {

    useEffect(() => {
        if (isInPosts) {
            if (groupId == '') {
                if (match) {
                    getPosts(0, 5, null, match.params.id);
                }
                else {
                    getPosts();
                }
            }
            else {
                getPosts(0, 5, groupId);
            }
        }

        return () => {
            // Dispose state posts from store
            // check history.location
            try {
                const pathname = history.location.pathname || [];

                const routePath = pathname.split('/');

                if (routePath.length > 1 && routePath[1] !== 'posts') {
                    resetPost();
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }, [groupId, match, isInPosts]);

    // UseEffect to hook if post has changed
    useEffect(() => {
        if (post) {
            updatePostsById(post._id);
        }
    }, [post]);

    const handleClick = (e, id) => {
        // Prevent Parent's on click from firing when a child is clicked.
        const senderElementName = e.target.tagName.toLowerCase();

        if (senderElementName === 'div') {
            history.push(`/posts/${id}`);
        }
    }

    const onClick = (id) => {
        assignPost(id);
    }

    return !loading && (
        posts.map(post => post.status === 1 ? (
            <div key={post._id} className="col-sm-12"
                onClick={() => onClick(post._id)}>
                <UserPost post={post} handleClick={handleClick} />
            </div >
        ) : <Fragment key={post._id}></Fragment>)
    );
};

PostsPage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    assignPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, {
    getPosts, resetPost,
    assignPost, updatePostsById
})(withRouter(PostsPage));

