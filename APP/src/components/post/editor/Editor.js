import React from 'react';
import ReactQuill from 'react-quill';

const Editor = ({ modules, formats, theme, text, setText, readOnly }) => {

    const handleChange = (value) => {
        setText(value);
    };

    return (
        <ReactQuill theme={theme} value={text} placeholder="Write something here..."
            onChange={handleChange}
            modules={modules}
            formats={formats}
            readOnly={readOnly} />
    );
};

export default Editor;