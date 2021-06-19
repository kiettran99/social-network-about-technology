import React from 'react';

import ReportPost from '../detail/ReportPost';
import ReportUser from '../detail/ReportUser';

const ReportDetail = ({ closeModal, detail }) => {
    return detail && detail.type === 'Post' ?
        <ReportPost closeModal={closeModal} detail={detail} /> :
        <ReportUser closeModal={closeModal} detail={detail} />
};

export default React.memo(ReportDetail);