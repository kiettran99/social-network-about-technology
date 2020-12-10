import React, { lazy, Suspense, useEffect, useState } from 'react';
import { connect } from 'react-redux';

const StarRatingComponent = lazy(() => import('react-star-ratings'));
//import StarRatingComponent from 'react-rating-stars-component';

const RatingVote = ({ ratings = [], auth: { user, isAuthenticated },
    ratingBuildParts, buildPartsId
}) => {

    useEffect(() => {
        if (isAuthenticated && user) {
            const rating = ratings.find(rating => rating.user === user._id);

            if (rating) {
                setStar(rating.overall);
            }
        }
    }, [user, isAuthenticated, ratings]);

    const [star, setStar] = useState(0);

    const ratingChanged = (value) => {
        ratingBuildParts(buildPartsId, value);
        setStar(value);
    };

    return (
        <div className="col-xs-10 col-md-9 text-center m-auto form-group">
            <div className="row form-group">
                <h5 className="text-muted">Add star to vote Build Parts.</h5>
            </div>
            <div className="row form-group">
                <Suspense fallback={<div>Loading...</div>}>
                    <StarRatingComponent
                        rating={star}
                        numberOfStars={5}
                        changeRating={ratingChanged}
                        starDimension={'25px'}
                    />
                </Suspense>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(RatingVote);