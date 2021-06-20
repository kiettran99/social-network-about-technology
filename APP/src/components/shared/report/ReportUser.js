import React from 'react';
import PropTypes from 'prop-types';

import Report from '../../post/user-post-sub/report/Report';

const ImageUploader = React.lazy(() => import('react-images-upload'));

const ReportUser = ({ closeModal, userId, groupId }) => {

    const onDropImages = (pictureFiles, setImages) => {
        if (setImages) {
            setImages(pictureFiles);
        }
    };

    const props = {
        targetId: userId || groupId,
        type: "User",
        onDropImages
    };

    return (
        <Report closeModal={closeModal}
            ImageUploader={ImageUploader}
            {...props}
        />
    );
};

ReportUser.propTypes = {
    closeModal: PropTypes.func.isRequired
};

export default React.memo(ReportUser);