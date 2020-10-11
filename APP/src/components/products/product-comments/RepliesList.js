import React from 'react';
import ReplyItem from './ReplyItem';

const RepliesList = ({ replies, productId, onCommentsForm, commentId }) => {

    return replies && replies.map(reply => (
        <ReplyItem key={reply._id} productId={productId} commentId={commentId} reply={reply} onCommentsForm={onCommentsForm} />
    ));
};

export default RepliesList;