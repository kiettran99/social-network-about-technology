import React from 'react';
import { connect, useSelector } from 'react-redux';

import Reply from './Reply';
import { getMoreReplies } from '../../../../actions/post';
import { useHistory } from 'react-router-dom';

const Replies = ({ replies, postId, lengthOfReplies, onCommentsForm, commentId, getMoreReplies }) => {

    const isInPosts = useHistory((state) => state.post.isInPosts);

    const handleGetMoreReplies = () => {
        getMoreReplies(postId, commentId, replies.length);
    }

    return replies && (
        <>
            {replies.length > 0 && replies.length !== lengthOfReplies && !isInPosts && (
                <div className="col-lg-12 pl-5">
                    <button className="btn btn-link" onClick={handleGetMoreReplies}>View previous replies</button>
                </div>
            )}
            {replies.slice(0).reverse().map(reply => (
                <Reply key={reply._id} postId={postId} commentId={commentId} reply={reply} onCommentsForm={onCommentsForm} />
            ))}
        </>
    )
};

export default connect(null, { getMoreReplies })(Replies);