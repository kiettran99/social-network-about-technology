import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setAlert } from '../../../../actions/alert';
import useLocalStorage from '../../../../hooks/useLocalStorage';

const Finish = ({ location }) => {

    const [currentAds] = useLocalStorage('current-ads');

    const dispatch = useDispatch();

    useEffect(() => {
        const query = queryString.parse(location.search);

        if (query.adsId && query.adsId === currentAds.ads) {
            // Push Notification local
            dispatch(setAlert('Successfully purchase', 'Purchase', 'success', 2000));
        }
    }, []);

    return (
        <div className="form-group text-center my-4">
            <img className="img-fluid rounded form-group" alt="Responsive image" src="/images/user/congratulation.png" />
            <h4 className="mb-3 text-muted">Sucessfully</h4>
            <p>Advertising Compaign has been actived.</p>
            <Link className="btn btn-outline-primary"
            onClick={() => localStorage.removeItem('current-ads')}
            to="/ads"
            >Return Ads Manager</Link>
        </div>
    );
};

export default Finish;