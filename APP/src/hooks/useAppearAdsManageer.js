import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { hasUserCreatedAds } from '../components/advertisement/services/adsServices';

import useLocalStorage from './useLocalStorage';

const useAppearAdsManageer = () => {

    // Redux storages, get user
    const { user, loading } = useSelector((state) => {
        return state.auth;
    });

    // get local storage to check user can go ads manager
    // ads manager appears when user has created ads.
    const [isAppear, setAppear] = useLocalStorage('ads-manager', false);

    useEffect(() => {
        if (!user && !loading) {
            setAppear(false);
        }
        
        if (!isAppear) {
            hasUserCreatedAds().then((data) => {
                if (typeof data !== 'boolean') {
                    return;
                }

                setAppear(data);
            });
        }
    }, [user]);

    return isAppear;
};

export default useAppearAdsManageer;