import { useState } from 'react';
import { EditorState } from 'draft-js';
import editor from './editor';

const useEditorState = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const getText = () => {
        const result = editor.getTextFromEditorState(editorState);
        return result;
    }

    const reset = () => {
        setEditorState(EditorState.createEmpty());
    }

    return { editorState, setEditorState, getText, reset };
};

export default useEditorState;