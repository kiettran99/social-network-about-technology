import React from 'react';
import LoadImage from './LoadImage';

const LoadImages = ({ images, onChangeImages, by = 'file' }) => {
    return images && images.length > 0 && images.map((image, index) =>
        <LoadImage key={index} image={image} onChangeImages={onChangeImages}
            by={by} index={index} />)
};

export default LoadImages;