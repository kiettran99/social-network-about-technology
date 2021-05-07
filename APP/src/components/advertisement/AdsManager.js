import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from './pagination/Pagination';

import { getListAds } from './services/adsServices';

const AdsManager = () => {

    // State
    const [ads, setAds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    const [isLoading, setLoading] = useState(false);

    // History
    const history = useHistory();

    // Function run when compoent did mount
    useEffect(() => {
        setLoading(true);
        loadAds();
    }, []);

    // Event Handler

    const loadAds = (selectedPage) => {
        getListAds({ selectedPage }).then(data => {
            // { ads, pages, currentPage }

            // Set State data from API
            setAds(data.ads);
            setCurrentPage(data.currentPage);
            setPages(data.pages);

            setLoading(false);
        }).catch(() => {

            setAds([]);
            setCurrentPage(1);
            setPages(0);
            setLoading(false);
        });
    };

    const onClickCreate = () => {
        history.push('/ads/create');
    };

    const onPageChange = (selectedPage) => {
        loadAds(selectedPage);
    };

    return (
        <div id="content-page" className="content-page">
            <div className="container">
                <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title">Ad Manager</h4>
                        </div>
                    </div>
                    <div className="iq-card-body">
                        <div className="mb-4 text-center">
                            <p>When you create a campaign, select a goal that corresponds to the main thing you want your campaign to achieve for your business.</p>
                        </div>

                        <div className="float-right form-group">
                            <button className="btn btn-primary"
                                onClick={() => onClickCreate()}><i className="ri-add-line pr-2"></i>Create Ads</button>
                        </div>

                        <table className="table table-striped table-hover">
                            {!isLoading && ads.length > 0 && (
                                <caption>Display result: {currentPage} - {currentPage + 1 < pages ? currentPage + 1 : pages} of {pages}</caption>
                            )}
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Clicks</th>
                                    <th scope="col">Likes</th>
                                    <th scope="col">Comments</th>
                                    <th scope="col">Shares</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads && ads.length > 0 &&
                                    ads.map((ad, index) => (
                                        <tr key={ad._id}
                                            style={{ cursor: 'pointer' }}>
                                            <th scope="row">
                                                {index + 1}
                                            </th>
                                            <td>{ad.name}</td>
                                            <td>{ad.status}</td>
                                            <td>{ad.activities ? ad.activities.length : 0}</td>
                                            <td>{ad.post.likes.length}</td>
                                            <td>{ad.post.lengthOfComments}</td>
                                            <td>{ad.post.share.users.length}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {!isLoading && (
                            <Pagination currentPage={currentPage} pages={pages}
                                onPageChange={onPageChange} />
                        )}

                        {isLoading && (
                            <div className="text-center mt-3">
                                <div className="spinner-border text-primary mb-2" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <p>Please wait...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdsManager;