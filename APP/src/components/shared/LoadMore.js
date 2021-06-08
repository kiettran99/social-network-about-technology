import React, { useState } from 'react';

const LoadMore = ({ action }) => {

    const [isLoading, setLoading] = useState(false);

    const onHandleClick = () => {
        // 1. Active loading
        setLoading(true);

        // 2. Run action method and change loading false.
        if (action) {
            action(() => {
                setLoading(false);
            });
        }
    }

    return !isLoading ? (
        <button className="btn btn-lg btn-primary"
            onClick={() => onHandleClick()}>
            Load More <i className="ri-arrow-down-line mr-0"></i>
        </button>
    ) : (
        <div className="text-center mt-3">
            <div className="spinner-border text-primary mb-2" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadMore;