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
            {
                ads.length > 0 && (
                    <div className="bg-white shadow-sm rounded p-2">
                        <h4 className="ml-2">Sponsored Posts</h4>
                    </div>
                )
            }
            {ads.length > 0 && ads.map(ad => (
                <div className="my-3" key={ad._id}>
                    <PreviewAd ad={ad} />
                </div>
            ))}
        </div>
    );
};

export default Ads;