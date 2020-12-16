import React, { useMemo } from 'react';

const LoadImage = ({ index, image, onChangeImages, by = 'file' }) => {
    
    const LoadImageMemo = useMemo(() => (
        <li className="col-md-4 col-6 pl-2 pr-0 pb-3" key={index}>
            <img className="img-fluid" src={by === 'file' ? URL.createObjectURL(image) : image} alt="profile-pic" />
            <i className="ri-close-circle-line text-muted" style={{
                position: 'absolute',
                left: "12px",
                top: '2px',
                fontSize: '1.4rem',
                cursor: 'pointer'
            }}
                onClick={() => onChangeImages(index)}
            ></i>
        </li>
    ), [image]);

    return LoadImageMemo;
};

export default LoadImage;