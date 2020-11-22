import React from 'react';

const Stories = () => {
    return (
        <div className="iq-card d-none d-sm-block">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Stories</h4>
                </div>
            </div>
            <div className="iq-card-body">
                <ul className="media-story m-0 p-0">
                    <li className="d-flex mb-4 align-items-center">
                        <i className="ri-add-line font-size-18" />
                        <div className="stories-data ml-3">
                            <h5>Creat Your Story</h5>
                            <p className="mb-0">time to story</p>
                        </div>
                    </li>
                    <li className="d-flex mb-4 align-items-center active">
                        <img src="/images/page-img/s2.jpg" alt="story-img" className="rounded-circle img-fluid" />
                        <div className="stories-data ml-3">
                            <h5>Anna Mull</h5>
                            <p className="mb-0">1 hour ago</p>
                        </div>
                    </li>
                    <li className="d-flex mb-4 align-items-center">
                        <img src="/images/page-img/s3.jpg" alt="story-img" className="rounded-circle img-fluid" />
                        <div className="stories-data ml-3">
                            <h5>Ira Membrit</h5>
                            <p className="mb-0">4 hour ago</p>
                        </div>
                    </li>
                    <li className="d-flex align-items-center">
                        <img src="/images/page-img/s1.jpg" alt="story-img" className="rounded-circle img-fluid" />
                        <div className="stories-data ml-3">
                            <h5>Bob Frapples</h5>
                            <p className="mb-0">9 hour ago</p>
                        </div>
                    </li>
                </ul>
                <a href="index.html#" className="btn btn-primary d-block mt-3">See All</a>
            </div>
        </div>
    );
};


export default Stories;