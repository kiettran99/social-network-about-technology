import React from 'react';
import Editor from './Editor';

const BubbleEditor = ({ text, setText, readOnly = false, ...rest }) => {

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, 'bold', 'italic',
                'link', 'image', 'video']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic',
        'link', 'image', 'video'
    ];

    const props = {
        modules,
        formats,
        setText: readOnly ? () => { } : setText,
        theme: "bubble",
        text,
        readOnly,
        ...rest
    };

    return <Editor {...props} />
};

export default React.memo(BubbleEditor);