import React from 'react';
import ReactQuill from 'react-quill';

const Editor = ({ modules, formats, theme, text, setText, readOnly, ...rest }) => {

    const handleChange = (value) => {
        setText(value);
    };

    return (
        <ReactQuill theme={theme} value={text}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            readOnly={readOnly}
            {...rest} />
    );
};

export default Editor;