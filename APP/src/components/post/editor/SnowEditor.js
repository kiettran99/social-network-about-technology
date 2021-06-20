import React from 'react';
import Editor from './Editor';

const SnowEditor = ({ text, setText, readOnly = false, ...rest }) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const props = {
        modules,
        formats,
        setText,
        theme: "snow",
        text,
        readOnly,
        ...rest
    };

    return <Editor {...props} />
};

export default SnowEditor;