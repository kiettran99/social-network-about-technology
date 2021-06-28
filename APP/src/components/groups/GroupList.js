import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';

import { getGroups, getGroupsByTab, resetGroups } from '../../actions/group';
import GroupsItem from './GroupsItem';
import LoadMore from '../shared/LoadMore';

// Constant
const GROUP_LIMIT = 6;

const GroupList = ({ group: { groups, search, loading },
    getGroups, resetGroups, getGroupsByTab
}) => {

    // State tab Home - JoinedGroup - Discovery
    const [tab, setTab] = useState(0);
    const [isLoading, setLoading] = useState(0);
    const [length, setLength] = useState(0);

    // Get Current User
    const { isAuthenticated, loading: loadingUser } = useSelector((state) => {
        return state.auth;
    })

    useEffect(() => {
        if (!isAuthenticated && !loadingUser) {
            getGroups(0, GROUP_LIMIT);
        }

        // Clean up reducers
        return () => {
            resetGroups();
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);

            getGroupsByTab(0, GROUP_LIMIT, search, tab, (length = 0) => {
                setLoading(false);
                setLength(length);
            });
        }
    }, [isAuthenticated, tab]);

    const changeTab = (tab) => {
        setTab(tab);
    }

    const getMore = (callback) => {
        getGroupsByTab(0, groups.length + GROUP_LIMIT, search, tab, (length = 0, data = []) => {
            if (data.length < length) {
                callback();
            }
        });
    }

    return (
        <div className="row" id="groupList">
            <div className="col-12 p-2">
                <ul className="nav nav-tabs" id="myTab-two" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active"
                            id="group-tab-one" data-toggle="tab" href="ui-tabs.html#home-two"
                            role="tab" aria-controls="home" aria-selected="true"
                            onClick={() => changeTab(0)}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"
                             id="group-tab-two" data-toggle="tab"
                            href="ui-tabs.html#profile-two" role="tab"
                            aria-controls="profile" aria-selected="false"
                            onClick={() => changeTab(1)}>Joined</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"
                             id="group-tab-three" data-toggle="tab"
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
            <div className="col-sm-12 form-group text-center">
                {groups && groups.length > 0 && groups.length < length && (
                    <LoadMore action={getMore} />
                )}
            </div>
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