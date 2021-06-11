import React from 'react';

const HashTagDraft = React.lazy(() => import('./hash-tag-draft/HashTagDraft'));

const HashTagEditor = ({ placeholder, disable,
    editorState, setEditorState
}) => {
    return (
        <div className="form-group">
            <p>HashTag</p>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">#</span>
                </div>
                <React.Suspense fallback={<div></div>}>
                    <HashTagDraft editorState={editorState}
                        setEditorState={setEditorState}
                        placeholder={placeholder}
                        disable={disable}
                    />
                </React.Suspense>
            </div>
        </div >
    );
};

export default React.memo(HashTagEditor);