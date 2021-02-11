import React, { useRef } from 'react';

import Editor from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';

// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const hashtagPlugin = createHashtagPlugin();

const plugins = [hashtagPlugin];

const HashTagDraft = ({ editorState, setEditorState, placeholder, disabled }) => {

    const inputRef = useRef();

    return (
        <div className="form-control rounded editor p-0 pl-2"
            onClick={() => inputRef.current.focus()}>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                plugins={plugins}
                placeholder={placeholder}
                readOnly={disabled}
                ref={inputRef} />
        </div>
    )
};

export default HashTagDraft;