import React, { memo } from 'react';

const LoadImages = ({ images, onChangeImages , by = 'file' }) => {
    return images && images.length > 0 && images.map((image, index) => (
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
    ))
};

export default memo(LoadImages);