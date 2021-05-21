import React from 'react';
import { useDispatch } from 'react-redux';
import { setComplete, setRequest } from '../../../../actions/loading-bar';
import { purchaseAds } from './services/paymentServices';

const Payment = ({ currentAds }) => {

    const dispatch = useDispatch();

    const onClick = async () => {
        dispatch(setRequest());

        console.log(currentAds.ads)

        await purchaseAds(currentAds.ads);

        dispatch(setComplete());
    };

    return (
        <div className="form-group text-center my-4">
            <h4 className="mb-3 text-muted">Please Purchase Ad Compaign to active it.</h4>
            <button className="btn btn-primary"
                onClick={onClick}><i className="ri-paypal-line"></i>Purchase with PayPal</button>
        </div>
    );
};

export default Payment;