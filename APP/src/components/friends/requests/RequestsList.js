import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RequestItem from './RequestItem';
import { getRequests } from '../../../actions/friend';

const RequestsList = ({ friend: { requests, loading }, getRequests }) => {

    useEffect(() => {
        getRequests(0, 10);

        return () => {
            getRequests(0, 3);
        };
    }, [getRequests]);

    return (
        <ul className="request-list list-inline m-0 p-0">
            {!loading && requests && requests.length > 0 && requests.map(request => (
                <RequestItem key={request._id} request={request} />
            ))}
        </ul>
    );
};

RequestsList.propTypes = {
    friend: PropTypes.object.isRequired,
    getRequests: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    friend: state.friend
});

export default connect(mapStateToProps, { getRequests })(RequestsList);