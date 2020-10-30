import React from 'react';
import ReplyItem from './ReplyItem';

const ReplyList = ({ replies, postId, onCommentsForm, commentId }) => {
    return replies && replies.map(reply => (
        <div className="d-flex flex-wrap row">
            <div className="offset-1 col-11">
                <ReplyItem key={reply._id} postId={postId} commentId={commentId} reply={reply} onCommentsForm={onCommentsForm} />
            </div>
        </div>
    ));
};

export default ReplyList;