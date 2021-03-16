import React from 'react';

const DisplayPrivacy = ({ privacy }) => {
    switch (privacy) {
        case 0:
            return <i className="ri-lock-fill" data-toggle="tooltip" data-placement="top" title="Only Me" />
        case 2:
            return <i className="ri-group-fill" data-toggle="tooltip" data-placement="top" title="Friends" />
        case 1:
        default:
            return <i className="ri-earth-fill" data-toggle="tooltip" data-placement="top" title="Public" />
    }
};

export default React.memo(DisplayPrivacy);