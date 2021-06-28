import React from 'react';

import { useSelector } from 'react-redux';

const RenderHtml = React.lazy(() => import('../../shared/RenderHtml'));

const About = () => {

    const group = useSelector((state) => {
        return state.group.group;
    });

    return (
        <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
                <div className="header-title">
                    <h4 className="iq-card-title">About</h4>
                </div>
            </div>
            <div className="iq-card-body">
                <ul className="list-inline p-0 m-0">
                    <li className="mb-3">
                        <div className="mb-0 truncate">
                            {group?.info && <RenderHtml text={group.info} length={20} />}
                        </div>
                    </li>
                        {group.isPublic ? (
                            <li className="mb-3">
                                <h6><i className="ri-earth-fill pr-2" />Public</h6>
                                <p className="mb-0 pl-4">Everyone can join and share in group.</p>
                            </li>
                        ) : (
                            <li className="mb-3">
                                <h6><i className="ri-lock-fill pr-2" />Private</h6>
                                <p className="mb-0 pl-4">Only menbers can view and post.</p>
                            </li>
                        )}
                        <li className="mb-3">
                            <h6><i className="ri-eye-fill pr-2" />Visible</h6>
                            <p className="mb-0 pl-4">You can follow or unfollow groups what you see in News Feed.</p>
                        </li>
                        <li>
                            <h6><i className="ri-group-fill pr-2" />General group</h6>
                            <p className="mb-0 pl-4">There are many variations of passages.</p>
                        </li>
                </ul>
            </div >
            </div >
            );
};

            export default React.memo(About);