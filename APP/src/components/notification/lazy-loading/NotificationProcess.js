import React from 'react';
import { connect } from 'react-redux';

import Process from '../../friends/lazy-loading/Process';
import { loadMoreNotification } from '../../../actions/notification';


const NotficationProcess = ({ notification: { notification: { messages: { length },
    loading } }, loadMoreNotification
}) => {

    const props = {
        length,
        loading,
        actionDispatch: loadMoreNotification
    };

    return <Process {...props} />
};

const mapStateToProps = (state) => ({
    notification: state.notification
});

export default connect(mapStateToProps, { loadMoreNotification })(NotficationProcess);