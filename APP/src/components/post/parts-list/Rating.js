import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RatingVote from './rating-vote/RatingVote';
import { getBuildParts, ratingBuildParts } from '../../../actions/build-parts';

const Rating = ({ buildPartsId, buildParts: { buildParts },
    getBuildParts, ratingBuildParts
}) => {

    useEffect(() => {
        getBuildParts(buildPartsId);
    }, [buildPartsId]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-2 col-md-3 text-center form-group">
                    {buildParts && buildParts.score && (
                        <>
                            <h1 className="rating-num">
                                {buildParts.score.rating == 0 ? "No rated yet." : buildParts.score.rating}
                            </h1>
                            <p className="form-group">{buildParts.score.count} total</p>
                        </>
                    )}
                </div>
                {buildParts && <RatingVote
                    buildPartsId={buildPartsId}
                    ratings={buildParts.ratings}
                    ratingBuildParts={ratingBuildParts} />}

            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    buildParts: state.buildParts,
    auth: state.auth
});

export default connect(mapStateToProps, { getBuildParts, ratingBuildParts })(Rating);