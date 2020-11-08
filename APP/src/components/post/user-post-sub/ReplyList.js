import React from 'react';
import ReplyItem from './ReplyItem';
import { connect } from 'react-redux';

import { getMoreReplies } from '../../../actions/post';


const ReplyList = ({ replies, postId, onCommentsForm, commentId, getMoreReplies }) => {

    const handleGetMoreReplies = () => {
        getMoreReplies(postId, commentId, replies.length);
    }

    return replies && (
        <>
            { replies.length > 0 && (
                <div className="d-flex flex-wrap row p-2">
                    <div className="offset-1 col-11">
                        <button className="btn btn-link" onClick={handleGetMoreReplies}>View previous replies</button>
                    </div>
                </div>
            )}
            {replies.slice(0).reverse().map(reply => (
                <div key={reply._id} className="d-flex flex-wrap row">
                    <div className="offset-1 col-11">
                        <ReplyItem postId={postId} commentId={commentId} reply={reply} onCommentsForm={onCommentsForm} />
                    </div>
                </div>
            ))}
        </>
    )
};

export default connect(null, { getMoreReplies })(ReplyList);