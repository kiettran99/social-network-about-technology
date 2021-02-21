import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroups, resetGroups  } from '../../actions/group';
import GroupsItem from './GroupsItem';

const GroupList = ({ group: { groups, loading }, getGroups, resetGroups }) => {

    useEffect(() => {
        getGroups();

        // Clean up reducers
        return () => {
            resetGroups();
        }
    }, []);

    return (
        <div className="row" id="groupList">
            {!loading && groups.map(group => (
               <GroupsItem group={group} key={group._id} /> 
            ))}
        </div>
    )
};

GroupList.propTypes = {
    group: PropTypes.object.isRequired,
    getGroups: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    group: state.group
});

export default connect(mapStateToProps, { getGroups, resetGroups })(GroupList);