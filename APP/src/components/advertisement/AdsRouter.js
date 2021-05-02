import React from 'react';

import useAppearAdsManageer from '../../hooks/useAppearAdsManageer';
import Ads from './Ads';
import AdsManager from './AdsManager';

const AdsRouter = (props) => {

    const isAppear = useAppearAdsManageer();
    
    return isAppear ? <AdsManager {...props} /> : <Ads {...props} />
};

export default AdsRouter;