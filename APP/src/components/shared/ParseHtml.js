import React from 'react';

import parse from 'html-react-parser';
import truncate from 'truncate-html';

const ParseHtml = ({ text = '', length = 50, shouldTruncate = false, byWords = true }) => {
    return shouldTruncate ? parse(truncate(text, length, { byWords }), { trim: true }) :
        parse(truncate(text));
};

export default React.memo(ParseHtml);