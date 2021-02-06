import React, { Fragment } from 'react';

const FileMentionComponent = ({ mention: { id }, children, className }) => {
    return (
        <Fragment key={id}>
            <span className={className}>{children}</span>
        </Fragment>

    );
}

export default FileMentionComponent;