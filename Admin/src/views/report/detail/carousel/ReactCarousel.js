import React from 'react';

import { Carousel } from 'react-responsive-carousel';

const ReactCarousel = ({ images }) => {

    return (
        <Carousel>
            {images && images.length > 0 && images.map((image, index) => (
                <div key={index}>
                    <img src={image} />
                </div>
            ))}
        </Carousel>
    );
};

export default React.memo(ReactCarousel);