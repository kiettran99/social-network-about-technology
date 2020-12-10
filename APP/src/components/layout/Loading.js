import React from 'react';

const Loading = () => {
    return (
        <div id="content-page" className="content-page" >
            <div className="container text-center mt-5">
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )
};

export default Loading;