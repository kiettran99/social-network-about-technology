import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/post';

import useEditorState from './editor/useEditorState';
import DraftJSEditor from './editor/DraftJSEditor';

const CommentsForm = ({ actionComment, auth: { isAuthenticated }, addComment, postId, isInPosts }) => {

    const { editorState, setEditorState, getText, reset } = useEditorState();

    const onSubmit = (e) => {
        e.preventDefault();

        if (postId) {
            addComment(postId, { text: getText(), rawText: editorState });
        }
        else {
            actionComment({ text: getText(), rawText: editorState });
        }

        reset();
    };

    return !isInPosts && (
        <form className="comment-text d-flex align-items-center mt-3" onSubmit={e => onSubmit(e)}>
            <DraftJSEditor
                disabled={!isAuthenticated}
                placeholder={isAuthenticated ? "Write comment here ...." :
                    "To leave a comment, you need to login."}
                editorState={editorState}
                setEditorState={setEditorState} />

            <div className="comment-attagement d-flex" style={{ zIndex: 1 }}>
                {/* <a href=""><i className="ri-link mr-3" /></a>
                <a href=""><i className="ri-user-smile-line mr-3" /></a>
                <a href=""><i className="ri-camera-line mr-3" /></a> */}
                <a style={{ cursor: "pointer" }} disabled={!isAuthenticated} onClick={e => onSubmit(e)}><i className="ri-send-plane-fill mr-3 text-primary"></i></a>
            </div>
        </form>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isInPosts: state.post.isInPosts
});

export default connect(mapStateToProps, { addComment })(CommentsForm);