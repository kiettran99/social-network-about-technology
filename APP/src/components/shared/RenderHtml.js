import React, { useState, useMemo } from 'react';
import truncate from 'truncate-html';

const RenderHtml = ({ text, Component, ...rest }) => {

    const [isTruncated, setTruncated] = useState(false);

    const textTruncated = useMemo(() => {
        if (!isTruncated) {
            const truncated = truncate(text, 150, { byWords: true });
            setTruncated(truncated.length === text.length);
            return truncated;
        }
        return truncate(text);
    }, [isTruncated, text]);

    const toggleLines = () => {
        setTruncated(!isTruncated);
    }

    return (
        <div>
            <Component {...rest} value={textTruncated} />
            {!isTruncated && (<p className="pointer text-primary ml-3" onClick={toggleLines}>Read More</p>)}
        </div>
    );
};

export default React.memo(RenderHtml);