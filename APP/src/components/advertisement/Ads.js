import React from 'react';
import { Link } from 'react-router-dom';

const Ads = () => {
    return (
        <div id="content-page" className="content-page bg-white">
            <div className="container">
                <div className="my-5 iq-maintenance">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                            <div className="col-sm-12 text-center">
                                <div className="iq-maintenance">
                                    <img src="/images/page-img/07.jpg" className="img-fluid w-50 shadow-md" alt="" />
                                    <h2 className="mt-4 mb-1 text-muted">Make one ad and show it everywhere.</h2>
                                    <p>With a register, you can create ads and you can reach people on all of their favourite apps and websites.</p>
                                    <Link to="/ads/create" className="btn btn-outline-primary form-group"
                                    >Create a ad</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="iq-card text-center mb-0">
                                    <div className="iq-card-body">
                                        <i className="ri-window-line ri-4x line-height text-primary" />
                                        <h5 className="card-title mt-1">Do it all in just a few steps.</h5>
                                        <p className="mb-0">Just build your ad once, then select run your ad in the places that are most likely to achieve your ad goals</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="iq-card text-center mb-0">
                                    <div className="iq-card-body">
                                        <i className="ri-time-line ri-4x line-height text-primary" />
                                        <h5 className="card-title mt-1">What is the Downtime?</h5>
                                        <p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="iq-card text-center mb-0">
                                    <div className="iq-card-body">
                                        <i className="ri-information-line ri-4x line-height text-primary" />
                                        <h5 className="card-title mt-1">Do you need Support?</h5>
                                        <p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ads;