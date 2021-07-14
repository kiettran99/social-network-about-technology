import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Review = ({ text, Component, reviewId }) => {
    return (
        <div className="bg-light p-1 mt-3 rounded">
            <div className="d-flex justify-content-between">
                <div>
                    <h4 className="ml-3 mt-2">News</h4>
                    <Component readOnly={true} text={text} />
                </div>
                <div className="my-auto mr-2">
                    <Link to={`/reviews/${reviewId}`} className="btn btn-primary">View More</Link>
                </div>
            </div>
        </div>
    );
};

export default memo(Review);