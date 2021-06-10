import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { getGroups, getGroupsByTab, resetGroups } from '../../actions/group';
import GroupsItem from './GroupsItem';

const GroupList = ({ group: { groups, search, loading },
    getGroups, resetGroups, getGroupsByTab
}) => {

    // State tab Home - JoinedGroup - Discovery
    const [tab, setTab] = useState(0);
    const [isLoading, setLoading] = useState(0);

    // Get Current User
    const isAuthenticated = useSelector((state) => {
        return state.auth.isAuthenticated;
    })

    useEffect(() => {
        if (!isAuthenticated) {
            getGroups();
        }

        // Clean up reducers
        return () => {
            resetGroups();
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);

            getGroupsByTab(0, 5, search, tab, () => {
                setLoading(false);
            });
        }
    }, [isAuthenticated, tab]);

    const changeTab = (tab) => {
        setTab(tab);
    }

    return (
        <div className="row" id="groupList">
            <div className="col-12 p-2">
                <ul className="nav nav-tabs" id="myTab-two" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active"
                            id="home-tab-two" data-toggle="tab" href="ui-tabs.html#home-two"
                            role="tab" aria-controls="home" aria-selected="true"
                            onClick={() => changeTab(0)}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"
                            id="profile-tab-two" data-toggle="tab"
                            href="ui-tabs.html#profile-two" role="tab"
                            aria-controls="profile" aria-selected="false"
                            onClick={() => changeTab(1)}>Joined</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"
                            id="contact-tab-two" data-toggle="tab"
                            href="ui-tabs.html#contact-two" role="tab"
                            aria-controls="contact" aria-selected="false"
                            onClick={() => changeTab(2)}>Discovery</a>
                    </li>
                </ul>
            </div>
            {!loading && groups.map(group => (
                <GroupsItem group={group} key={group._id} />
            ))}
            {isLoading && (
                <div className="col-12 text-center mt-3">
                    <div className="spinner-border text-primary mb-2" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p>Please wait...</p>
                </div>
            )}
        </div>
    )
};

GroupList.propTypes = {
    group: PropTypes.object.isRequired,
    getGroups: PropTypes.func.isRequired,
    getGroupsByTab: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    group: state.group
});

export default connect(mapStateToProps, {
    getGroups,
    resetGroups,
    getGroupsByTab
})(GroupList);