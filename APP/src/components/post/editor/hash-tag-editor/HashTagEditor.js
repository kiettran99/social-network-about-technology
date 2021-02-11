import React from 'react';
import HashTagDraft from './hash-tag-draft/HashTagDraft';

const HashTagEditor = ({ placeholder, disable,
    editorState, setEditorState
}) => {
    return (
        < div className="" >
            <p className="text-primary">HashTag: </p>
            <HashTagDraft editorState={editorState}
                setEditorState={setEditorState}
                placeholder={placeholder}
                disable={disable}
            />
        </div >
    );
};

export default React.memo(HashTagEditor);