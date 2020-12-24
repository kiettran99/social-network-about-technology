import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RequestItem from './RequestItem';
import { getRequests, getMoreRequests } from '../../../actions/friend';

const RequestsList = ({ friend: { requests, loading }, getRequests,
    getMoreRequests
}) => {

    useEffect(() => {
        getRequests(0, 10);

        return () => getRequests(0, 3);
    }, [getRequests]);

    const isExistsRequests = () => !loading && requests && requests.length > 0;

    return (
        <>
            <ul className="request-list list-inline m-0 p-0">
                {isExistsRequests() && requests.map(request => (
                    <RequestItem key={request._id} request={request} />
                ))}
            </ul>
            {isExistsRequests() && (
                <div className="text-center">
                    <button className="mr-3 btn text-primary btn-link"
                        onClick={() => getMoreRequests(requests.length, 10)}
                    >View more requests</button>
                </div>
            )}
        </>
    );
};

RequestsList.propTypes = {
    friend: PropTypes.object.isRequired,
    getRequests: PropTypes.func.isRequired,
    getMoreRequests: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    friend: state.friend
});

export default connect(mapStateToProps, { getRequests, getMoreRequests })(RequestsList);