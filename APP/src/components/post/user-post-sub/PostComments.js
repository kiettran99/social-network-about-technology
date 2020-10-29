import React from 'react';
import PostComment from './PostComment';

const PostComments = ({ postId, comments }) => {
    return (
        <ul className="post-comments p-0 m-0">
            {comments.map(comment => (
                <PostComment key={comment._id} comment={comment}
                    postId={postId} />
            ))}
        </ul>
    )
};

export default PostComments;