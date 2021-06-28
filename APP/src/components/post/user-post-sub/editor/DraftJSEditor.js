import React, {
    useCallback,
    useRef,
    useState,
} from 'react';
import './SimpleMentionEditor.css';

import Editor from '@draft-js-plugins/editor';
import createMentionPlugin from '@draft-js-plugins/mention';

import editor from './editor';
import FileMentionComponent from './FileMentionComponent';

// Draft-JS-Mentions plugin configuration
const mentionPlugin = createMentionPlugin({
    mentionComponent: FileMentionComponent,
    positionSuggestions: (settings) => {
        return {
            left: settings.decoratorRect.left + 'px',
            display: 'block',
            transform: 'scale(1) translateY(-100%)',
            transformOrigin: '1em 0% 0px',
            transition: 'all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)'
        };
    }
});
const { MentionSuggestions } = mentionPlugin;

const plugins = [mentionPlugin];

const DraftJSEditor = ({ disabled, placeholder, editorState, setEditorState }) => {

    const ref = useRef();

    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const onOpenChange = useCallback((_open) => {
        setOpen(_open);
    }, []);

    const onSearchChage = useCallback(({ value }) => {
        editor.getMentionByName(value).then((mentions) => setSuggestions(mentions));
    }, []);

    return (
        <div className="editor rounded w-100 p-0 pl-2"
            onClick={() => ref.current.focus()}>
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                plugins={plugins}
                placeholder={placeholder}
                readOnly={disabled}
                ref={ref} />
            <MentionSuggestions
                open={open}
                onOpenChange={onOpenChange}
                suggestions={suggestions}
                onSearchChange={onSearchChage}
            />
        </div>
    );
};

export default React.memo(DraftJSEditor);