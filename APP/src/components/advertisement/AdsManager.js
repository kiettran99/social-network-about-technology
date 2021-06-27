import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';

import useLocalStorage from '../../hooks/useLocalStorage';

import Pagination from './pagination/Pagination';
import { getListAds, toggleStatusCompaign } from './services/adsServices';

const AdsManager = () => {

    // State
    const [ads, setAds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);

    const [isLoading, setLoading] = useState(false);
    const [viewAs, setviewAs] = useLocalStorage('ads-view-by', 'all');

    const [startDate, setStartDate] = useLocalStorage('ads-start-date', dayjs().toDate());
    const [endDate, setEndDate] = useLocalStorage('ads-end-date', dayjs().toDate());

    // Refs
    const searchTitleRef = useRef(null);

    // History
    const history = useHistory();

    // Function run when compoent did mount
    useEffect(() => {
        setLoading(true);
        setAds([])
        loadAds(currentPage, null, viewAs);
    }, [startDate, endDate]);

    // Event Handler
    const displayStatus = (status) => {
        switch (status) {
            case 0:
                return 'Paused';
            case 1:
                return 'Active';
            case 2:
            default:
                return 'Not Active';
        }
    }

    const loadAds = (selectedPage, search, viewAs) => {

        const params = {};

        if (selectedPage) params.selectedPage = selectedPage;
        if (search) params.search = search;
        if (viewAs) {
            params.viewAs = viewAs;

            // Extra params when viewAs is custom
            if (viewAs === 'custom') {
                params.startDate = dayjs(startDate).format('YYYY-MM-DD');
                params.endDate = dayjs(endDate).format('YYYY-MM-DD');
            }
        }

        getListAds(params).then(data => {
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

    const onToggleAds = (_, id) => {
        // Call API to active or deactive
        toggleStatusCompaign(id).then(() => {
            // If success and then update state from client
            setAds(state => state.map(ad => {
                if (ad._id === id) {
                    return {
                        ...ad,
                        status: ad.status === 1 ? 0 : 1
                    };
                }

                return ad;
            }));
        });
    };

    const onEditAds = (ad) => {
        // Edit ads from state
        history.push({
            pathname: `/ads/${ad._id}/edit`,
            state: { ad }
        });
    }

    const onPageChange = (selectedPage) => {
        loadAds(selectedPage, searchTitleRef.current?.value, viewAs);
    };

    /**
   * @desc Form handles search news by tiltles.
   * @param {Event} e
   */
    const onSearchTitle = (e) => {
        if (e.keyCode === 13) {
            loadAds(currentPage, searchTitleRef.current?.value, viewAs);
        }
    };

    const onHandleViewAs = (e) => {
        setviewAs(e.target.value);
        loadAds(currentPage, searchTitleRef.current?.value, e.target.value);
    }

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
                        <div className="row">

                            <div className="col-12 form-group">
                                <button className="btn btn-primary float-right"
                                    onClick={() => onClickCreate()}><i className="ri-add-line pr-2"></i>Create Ads</button>
                            </div>

                            <div className="col-12 form-group">
                                <div className="d-flex flex-md-row justify-content-md-between flex-column mt-sm-2">
                                    <input className="form-control float-left w-50 bg-white" placeholder="Find by name"
                                        ref={searchTitleRef} onKeyDown={onSearchTitle}
                                    />

                                    <div className="form-inline ml-1 ml-md-0 mt-2 mt-md-0">
                                        <label>View As: &nbsp;</label>
                                        <select className="form-control bg-white" defaultValue={viewAs}
                                            onChange={onHandleViewAs}>
                                            <option value='all'>All</option>
                                            <option value='today'>Today</option>
                                            <option value='month'>Month</option>
                                            <option value='year'>Year</option>
                                            <option value='custom'>Custom</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {viewAs === 'custom' && (
                                <div className="col-12 form-group">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="ml-1">Start Date</p>
                                        </div>
                                        <div className="col-6">
                                            <p className="ml-1 ml-md-0">End Date</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <input className="form-control"
                                                type="date"
                                                name="startDate"
                                                defaultValue={dayjs(startDate).format('YYYY-MM-DD')}
                                                onChange={(e) => setStartDate(e.target.valueAsDate)}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <input className="form-control"
                                                type="date"
                                                defaultValue={dayjs(endDate).format('YYYY-MM-DD')}
                                                name="endDate"
                                                onChange={(e) => setEndDate(e.target.valueAsDate)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <table className="table table-striped table-hover">
                            {!isLoading && ads && ads.length > 0 && (
                                <caption>Display result: {((currentPage - 1) * 4) + 1} - {currentPage * 4} of {pages * 4}</caption>
                            )}
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th></th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Clicks</th>
                                    <th scope="col">Likes</th>
                                    <th scope="col">Comments</th>
                                    <th scope="col">Shares</th>
                                    <th></th>
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
                                            <td>
                                                {ad.status !== 2 ? (
                                                    <div className="custom-control custom-switch custom-control-inline mr-0 pl-2">
                                                        <input type="checkbox" className="custom-control-input" id={ad._id} defaultChecked={ad.status === 1}
                                                            onChange={(e) => onToggleAds(e, ad._id)} />
                                                        <label className="custom-control-label" htmlFor={ad._id}></label>
                                                    </div>
                                                ) : (
                                                    <i className="ri-question-fill text-primary" data-toggle="tooltip" title="You need purchase it from edit advertising compaign."></i>
                                                )}
                                            </td>
                                            <td>{displayStatus(ad.status)}</td>
                                            <td>{ad.activities ? ad.activities.length : 0}</td>
                                            <td>{ad.post?.likes?.length}</td>
                                            <td>{ad.post?.lengthOfComments}</td>
                                            <td>{ad.post?.share?.users?.length}</td>
                                            <td>
                                                <i className="ri-edit-2-line button"
                                                    onClick={() => onEditAds(ad)}></i>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        {!isLoading && ads.length === 0 && (
                            <div className="text-center mt-3">                        
                                <p>No Campiagns Found.</p>
                            </div>
                        )}

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