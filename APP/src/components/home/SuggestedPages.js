import React from 'react';

const SuggestedPages = () => {
    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                    <h4 className="card-title">Suggested Pages</h4>
                </div>
                <div className="iq-card-header-toolbar d-flex align-items-center">
                    <div className="dropdown">
                        <span className="dropdown-toggle" id="dropdownMenuButton01" data-toggle="dropdown" aria-expanded="false" role="button">
                            <i className="ri-more-fill" />
                        </span>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton01" style={{}}>
                            <a className="dropdown-item" href="index.html#"><i className="ri-eye-fill mr-2" />View</a>
                            <a className="dropdown-item" href="index.html#"><i className="ri-delete-bin-6-fill mr-2" />Delete</a>
                            <a className="dropdown-item" href="index.html#"><i className="ri-pencil-fill mr-2" />Edit</a>
                            <a className="dropdown-item" href="index.html#"><i className="ri-printer-fill mr-2" />Print</a>
                            <a className="dropdown-item" href="index.html#"><i className="ri-file-download-fill mr-2" />Download</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="iq-card-body">
                <ul className="suggested-page-story m-0 p-0 list-inline">
                    <li className="mb-3">
                        <div className="d-flex align-items-center mb-3">
                            <img src="/images/page-img/42.png" alt="story-img" className="rounded-circle img-fluid avatar-50" />
                            <div className="stories-data ml-3">
                                <h5>Iqonic Studio</h5>
                                <p className="mb-0">Lorem Ipsum</p>
                            </div>
                        </div>
                        <img src="/images/small/img-1.jpg" className="img-fluid rounded" alt="Responsive image" />
                        <div className="mt-3"><a href="index.html#" className="btn d-block"><i className="ri-thumb-up-line mr-2" /> Like Page</a></div>
                    </li>
                    <li className="">
                        <div className="d-flex align-items-center mb-3">
                            <img src="/images/page-img/42.png" alt="story-img" className="rounded-circle img-fluid avatar-50" />
                            <div className="stories-data ml-3">
                                <h5>Cakes &amp; Bakes </h5>
                                <p className="mb-0">Lorem Ipsum</p>
                            </div>
                        </div>
                        <img src="/images/small/img-2.jpg" className="img-fluid rounded" alt="Responsive image" />
                        <div className="mt-3"><a href="index.html#" className="btn d-block"><i className="ri-thumb-up-line mr-2" /> Like Page</a></div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SuggestedPages;