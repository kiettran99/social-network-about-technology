import React, { useEffect, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';

import Review from './Review';
import DialogBox from '../shared/DialogBox';
import CreateReview from './create/CreateReview';
import LoadMore from '../shared/LoadMore';

import { getReviews, resetReview, getMoreReviews } from '../../actions/review';

const Reviews = ({ getReviews, resetReview, getMoreReviews }) => {

    const [modalIsOpen, setIsOpen] = useState(false);

    const [filterBy, setFilterBy] = useState('all');

    const { auth, user, review: { reviews, loading } } = useSelector((state) => ({
        auth: state.auth,
        review: state.review,
        user: state.auth.user
    }));

    const searchTitleRef = useRef(null);

    useEffect(() => {
        getReviews();
    }, []);

    useEffect(() => {
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
        getMoreReviews(reviews.length, 5, searchTitleRef.current.value, filterBy, callback);
    };

    /**
     * @desc Form handles search news by tiltles.
     * @param {Event} e
     */
    const onSearchTitle = (e) => {
        if (e.keyCode === 13) {
            const limit = reviews.length > 5 ? reviews.length : 5;
            getReviews(0, limit, searchTitleRef.current.value, filterBy);
        }
    };

    const onHandleFilterBy = (e) => {
        setFilterBy(e.target.value);
        const limit = reviews.length > 5 ? reviews.length : 5;
        getReviews(0, limit, searchTitleRef.current.value, e.target.value);
    }

    return (
        <>
            <div id="content-page" className="content-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="iq-card position-relative inner-page-bg bg-primary" style={{ height: "150px" }}>
                                <div className="inner-page-title">
                                    <h3 className="text-white">Technology News</h3>
                                    <p className="text-white">Reporting on the popularity of technology, reviews about Computers, Smartphones.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 form-group">
                            {auth.isAuthenticated && user && user.role !== 'user' && (
                                <button className="btn btn-primary float-right"
                                    onClick={() => openModal()}>
                                    <i className="ri-add-line pr-2" />Create a New
                                </button>
                            )}
                        </div>
                        <div className="col-12 form-group">
                            <div className="d-flex justify-content-between mt-sm-2">
                                <input className="form-control float-left w-50 bg-white" placeholder="Find by name"
                                    ref={searchTitleRef} onKeyDown={onSearchTitle}
                                />

                                <div className="form-inline">
                                    <label>Filter By: &nbsp;</label>
                                    <select className="form-control bg-white" defaultValue={filterBy}
                                        onChange={onHandleFilterBy}>
                                        <option value='all'>All</option>
                                        <option value='computers'>Computers</option>
                                        <option value='smartphones'>Smartphones</option>
                                        <option value='others'>Others</option>
                                    </select>
                                </div>
                            </div>
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