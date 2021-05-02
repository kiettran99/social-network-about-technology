import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { hasUserCreatedAds } from '../components/advertisement/services/adsServices';

import useLocalStorage from './useLocalStorage';

const useAppearAdsManageer = () => {

    // Redux storages, get user
    const user = useSelector((state) => {
        return state.auth.user;
    });

    // get local storage to check user can go ads manager
    // ads manager appears when user has created ads.
    const [isAppear, setAppear] = useLocalStorage('ads-manager', false);

    useEffect(() => {
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