import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';
import UserPost from './UserPost';
import { withRouter } from 'react-router-dom';

const PostsPage = ({ post: { posts, loading }, getPosts, history, groupId = '' }) => {

    useEffect(() => {

        if (groupId == '') {
            getPosts();
        }
        else {
            getPosts(0, 5, groupId);
        }
    }, [groupId]);

    return !loading && (
        posts.map(post => (
            <div key={post._id} className="col-sm-12" onClick={(e) => {
                // Prevent Parent's on click from firing when a child is clicked.

                const senderElementName = e.target.tagName.toLowerCase();

                if (senderElementName === 'div') {
                    history.push(`/posts/${post._id}`)
                }
            }}>
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

