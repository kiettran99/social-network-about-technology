import React from 'react';
import Comment from './Comment';
import { connect, useSelector } from 'react-redux';
import Form from './form/Form';

import { getMoreComments } from '../../../actions/post';

const Comments = ({ getMoreComments }) => {

    const { post, isInPosts } = useSelector((state) => {
        return state.post;
    });

    const { _id, comments, lengthOfComments } = post || {};


    const handleGetMoreComments = (postId) => {
        getMoreComments(postId, comments.length);
    }

    return (
        <div className="col-lg-12">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height blog user-comment">
                <div className="iq-card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="iq-card-title">User Comment</h4>
                    </div>
                </div>
                <div className="iq-card-body">
                    <div className="row">
                        {comments && comments.length > 0 && comments.length !== lengthOfComments && !isInPosts && (
                            <div className="pb-2">
                                <button className="btn btn-link" onClick={() => handleGetMoreComments(_id)}>View previous comments</button>
                            </div>
                        )}
                        {comments && comments.slice(0).reverse().map(comment => (
                            <Comment key={comment._id} comment={comment}
                                postId={_id} />
                        ))}
                         <Form postId={_id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { getMoreComments })(Comments);