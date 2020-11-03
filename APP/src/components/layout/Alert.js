import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { removeAlert, updateActiveAlert } from '../../actions/alert';

// @component Alert to show pop-up notify message.
const Alert = ({ alert, removeAlert, updateActiveAlert }) => {

    const createNotification = (id, type, title, message, timeout) => {
        switch (type) {
            case 'info':
                NotificationManager.info(message, title, timeout);
                break;
            case 'success':
                NotificationManager.success(message, title, timeout);
                break;
            case 'warning':
                NotificationManager.warning(message, title, timeout);
                break;
            case 'error':
                NotificationManager.error(message, title, timeout);
                break;
        }

        removeAlert(id, timeout);
    }

    useEffect(() => {
        if (alert && alert.length > 0) {

            alert.forEach(al => {
                const { id, type, title = 'Success', message, timeout, isActive } = al;

                if (isActive) {
                    updateActiveAlert(id);
                    createNotification(id, type, title, message, timeout);
                }
            })
        }

    }, [alert]);

    return <NotificationContainer />;
};

Alert.propTypes = {
    alert: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    alert: state.alert
});

export default connect(mapStateToProps, { removeAlert, updateActiveAlert })(Alert);