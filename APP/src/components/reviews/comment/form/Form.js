import React from 'react';
import { connect, useSelector } from 'react-redux';
import { addComment } from '../../../../actions/post';

import useEditorState from '../../../post/user-post-sub/editor/useEditorState';
import DraftJSEditor from '../../../post/user-post-sub/editor/DraftJSEditor';

const Form = ({ actionComment, addComment, postId }) => {

    const { auth: { isAuthenticated } } = useSelector(state => ({
        auth: state.auth
    }));

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

    return (
        <div className="col-lg-12">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height blog">
                <div className="iq-card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="iq-card-title">Your Comment</h4>
                    </div>
                </div>
                <div className="iq-card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Comment</label>
                            <div className="post-text">
                                <DraftJSEditor
                                    disabled={!isAuthenticated}
                                    placeholder={isAuthenticated ? "Write comment here ...." :
                                        "To leave a comment, you need to login."}
                                    editorState={editorState}
                                    setEditorState={setEditorState} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn iq-bg-danger"
                            onClick={() => reset()}>Clear</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { addComment })(Form);