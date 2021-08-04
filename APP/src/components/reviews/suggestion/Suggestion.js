import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import dayjs from '../../../utils/relativeDate';
import { getReviews } from '../../../actions/review';

const Suggestion = ({ review: { reviews, loading }, getReviews, match }) => {

    useEffect(() => {
        getReviews();
    }, [match]);

    return !loading && (
        <div className="col-lg-4">
            <div className="iq-card iq-card-block iq-card-stretch iq-card-height blog-post">
                <div className="iq-card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="iq-card-title">Other Reviews</h4>
                    </div>
                </div>
                <div className="iq-card-body">
                    <ul className="list-inline p-0 mb-0 mt-2">
                        {reviews && reviews.length > 0 &&
                            reviews.map(review => (
                                <li key={review._id} className="mb-3">
                                    <div className="d-flex align-items-top pb-3 border-bottom">
                                        <div className="col-md-5">
                                            <div className="image-block">
                                                <img src={review.wallpaper} className="img-fluid rounded w-100" alt="blog-img" />
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="blog-description pl-2">
                                                <div className="date mb-1"><span className="text-primary" tabIndex={-1}>{dayjs(review.createdAt).fromNow()}</span></div>
                                                <h6 className="mb-2">{review.post.text}</h6>
                                                <Link to={`/reviews/${review._id}`} className="mb-2">
                                                    View detail <i className="ri-arrow-right-s-line" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    review: state.review
});

export default connect(mapStateToProps, { getReviews })(Suggestion);