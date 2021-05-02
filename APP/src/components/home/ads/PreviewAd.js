import React from 'react';
import { useHistory } from 'react-router-dom';

import PreviewPost from '../../advertisement/create-ads/preview-post/PreviewPost';

import { handleClickAds } from '../../advertisement/services/adsServices';

const PreviewAd = ({ ad: { _id, post } }) => {

    // Create History
    const history = useHistory();

    // Function check if user click div element, website pushes /post
    const onHandleClickAds = (e) => {

        // Website pushes when user click div element
        const senderElementName = e.target.tagName.toLowerCase();

        if (senderElementName === 'div') {
            // Call API to services get activity
            handleClickAds(_id);

            // Push page post ads
            history.push(`/posts/${post._id}`);
        }
    };

    return (
        <PreviewPost post={post} handleClick={(e) => onHandleClickAds(e)} />
    );
};

export default PreviewAd;