import React from 'react';
import PreviewPost from '../../advertisement/create-ads/preview-post/PreviewPost';

const PreviewAd = ({ ad: { _id, post, owner }}) => {

    return (
        <PreviewPost post={post} />
    );
};

export default PreviewAd;