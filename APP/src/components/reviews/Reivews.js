import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import Review from './Review';
import DialogBox from '../shared/DialogBox';
import CreateReview from './create/CreateReview';
import LoadMore from '../shared/LoadMore';

import { getReviews, resetReview, getMoreReviews } from '../../actions/review';

const Reviews = ({ getReviews, resetReview, getMoreReviews }) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const { auth, review: { reviews, loading } } = useSelector((state) => ({
        auth: state.auth,
        review: state.review
    }));

    useEffect(() => {
        getReviews();

        return () => {
            resetReview();
        }
    }, []);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const getMore = (callback) => {
        getMoreReviews(reviews.length, 5, callback);
    }

    return (
        <>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card position-relative inner-page-bg bg-primary" style={{ height: "150px" }}>
                                <div className="inner-page-title">
                                    <h3 className="text-white">Review Pages</h3>
                                    <p className="text-white">Share your thoughts with everyone by submitting a review.
                                 You can always add text, photos or videos to your review at any time.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 form-group">
                            {auth.isAuthenticated && (
                                <button className="btn btn-primary float-right"
                                    onClick={() => openModal()}>
                                    <i className="ri-add-line pr-2" />Create New Review
                                </button>
                            )}
                        </div>
                        {reviews && reviews.length > 0 && reviews.map(review => (
                            <Review key={review._id} review={review} />
                        ))}

                        <div className="col-sm-12 form-group text-center">
                            {reviews && reviews.length > 0 && (
                                <LoadMore action={getMore} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <DialogBox props={{ modalIsOpen, closeModal, openModal }} Component={CreateReview} />
        </>
    );
};

export default connect(null, {
    getReviews, resetReview, getMoreReviews
})(Reviews);