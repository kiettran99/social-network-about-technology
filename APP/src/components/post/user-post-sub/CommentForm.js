import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/post';

const CommentsForm = ({ actionComment, auth: { isAuthenticated }, addComment, postId }) => {

    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (postId) {
            addComment(postId, { text });
        }
        else {
            actionComment({ text });
        }
        setText('');
    };

    return (
        <form className="comment-text d-flex align-items-center mt-3" onSubmit={e => onSubmit(e)}>
            <input type="text" className="form-control rounded"
                name="text" value={text} onChange={(e) => setText(e.target.value)}
                disabled={!isAuthenticated}
                placeholder={isAuthenticated ? "Write comment here ...." :
                    "To leave a comment, you need to login."} />

            <div className="comment-attagement d-flex">
                <a href=""><i className="ri-link mr-3" /></a>
                <a href=""><i className="ri-user-smile-line mr-3" /></a>
                <a href=""><i className="ri-camera-line mr-3" /></a>
                <a style={{ cursor: "pointer" }} disabled={!isAuthenticated} onClick={e => onSubmit(e)}><i className="ri-send-plane-fill mr-3 text-primary"></i></a>
            </div>
        </form>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentsForm);