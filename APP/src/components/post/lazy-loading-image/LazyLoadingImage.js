import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const LazyLoadingImage = (props) => {

    const { src, alt = '', ...rest } = props;

    return <LazyLoadImage
        alt={alt}
        effect='blur'
        src={src}
        {...rest}
    />
};

export default React.memo(LazyLoadingImage);