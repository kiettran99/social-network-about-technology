import React from 'react';
import HashTagDraft from './hash-tag-draft/HashTagDraft';

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
                <HashTagDraft editorState={editorState}
                    setEditorState={setEditorState}
                    placeholder={placeholder}
                    disable={disable}
                />
            </div>
        </div >
    );
};

export default React.memo(HashTagEditor);