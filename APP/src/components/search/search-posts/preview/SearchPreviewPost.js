import React from 'react';
import { useHistory } from 'react-router-dom';
import PreviewPost from '../../../advertisement/create-ads/preview-post/PreviewPost';

const SearchPreviewPost = ({ post }) => {
    // Create History
    const history = useHistory();

    // Function check if user click div element, website pushes /post
    const onHandleClick = (e) => {

        // Website pushes when user click div element
        const senderElementName = e.target.tagName.toLowerCase();

        if (senderElementName === 'div') {
            // Push page post ads
            history.push(`/posts/${post._id}`);
        }
    };

    return (
        <PreviewPost post={post} handleClick={(e) => onHandleClick(e)}
            isDisplayTime={true} />
    );
};

export default SearchPreviewPost;