import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import CreateAds from '../create-ads/CreateAds';
import Loading from '../../layout/Loading';
import { getAdById } from '../services/adsServices';

const Edit = ({ match }) => {

    // State store a campaign
    const [ad, setAd] = useState(null);

    const location = useLocation();

    useEffect(() => {
        if (location.state?.ad) {
            setAd(location.state.ad);
        }
        else {
            //Call API to get ad by Id
            getAdById(match.params.id).then(data => {
                setAd(data);
            });
        }
    }, [location]);

    return ad === null ? <Loading /> : (
        <CreateAds
            location={location}
            edit={true} currentCampaign={ad} setAd={setAd} />
    );
};

export default Edit;