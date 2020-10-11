import { SET_ALERT, REMOVE_ALERT } from './types';

// @params
// @msg: error msessage api sent.
// @timeout: a miliseconds to close alert
// @return function has param dispatch.
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = (new Date().getMilliseconds()).toString();

    dispatch({
        type: SET_ALERT,
        payload: {
            id, msg, alertType, timeout
        }
    });

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }, timeout);
};