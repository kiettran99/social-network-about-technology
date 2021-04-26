import React, { useEffect, useState } from 'react';
import { getAds } from '../services/homeServices';
import PreviewAd from './PreviewAd';

const Ads = () => {

    // State
    const [ads, setAds] = useState([]);

    // Call service to get Ads
    useEffect(() => {
        getAds().then((ads) => setAds(ads))
            .catch(() => setAds([]));
    }, []);

    return (
        <div className="col-lg-4">
            <h4>Posts</h4>
            {ads.length > 0 && ads.map(ad => (
                <div className="my-3" key={ad._id}>
                    <PreviewAd ad={ad} />
                </div>
            ))}
        </div>
    );
};

export default Ads;