import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPosts, resetPost } from '../../actions/post';
import { connect } from 'react-redux';
import UserPost from './UserPost';
import { withRouter } from 'react-router-dom';

const PostsPage = ({ post: { posts, isInPosts, loading }, getPosts, resetPost,
    history, groupId = '', match
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

    return !loading && (
        posts.map(post => post.status === 1 ? (
            <div key={post._id} className="col-sm-12" onClick={(e) => {
                // Prevent Parent's on click from firing when a child is clicked.

                const senderElementName = e.target.tagName.toLowerCase();

                if (senderElementName === 'div') {
                    history.push(`/posts/${post._id}`)
                }
            }}>
                <UserPost post={post} />
            </div>
        ) : <Fragment key={post._id}></Fragment>)
    );
};

PostsPage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts, resetPost })(withRouter(PostsPage));

