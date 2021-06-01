import { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
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

    const getUsersFromMention = () => {
        const rawEditorContent = convertToRaw(editorState.getCurrentContent());
        const entityMap = rawEditorContent.entityMap;

        return Object.values(entityMap).reduce((enities, entity) => {
            if (entity.data?.mention) {
                enities.push(entity.data?.mention);
            }

            return enities;
        }, []);
    }

    return { editorState, setEditorState, getText, reset, getUsersFromMention };
};

export default useEditorState;