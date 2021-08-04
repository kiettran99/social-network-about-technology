import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getReview, resetReview } from '../../actions/review';
import Post from './post/Post';
import Suggestion from './suggestion/Suggestion';
import Comments from './comment/Comments';

const ReviewDetail = ({ match, getReview, resetReview }) => {

    const history = useHistory();

    const { review: { review, loading } } = useSelector((state) => ({
        review: state.review
    }));

    useEffect(() => {
        window.scrollTo(0, 0);
        
        getReview(match.params.id, history);

        return () => {
            resetReview();
        }
    }, [match.params.id, history]);

    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="row">
                    <Post review={review} />
                    <Suggestion match={match} />
                    <Comments />
                </div>
            </div>
        </div >
    );
};

export default connect(null, { getReview, resetReview })(ReviewDetail);