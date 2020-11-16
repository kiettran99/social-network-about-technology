import { SET_ALERT, REMOVE_ALERT, UPDATE_ACTIVE_ALERT } from './types';
import { v4 as uuid } from 'uuid';

// @params
// @message: error msessage api sent.
// @timeout: a miliseconds to close alert
// @return function has param dispatch.
export const setAlert = (message, title, type, timeout = 5000) => dispatch => {
    const id = uuid();

    dispatch({
        type: SET_ALERT,
        payload: {
            id, message, title, type, timeout, isActive: true
        }
    });
};

export const updateActiveAlert = (id) => dispatch => {
    dispatch({
        type: UPDATE_ACTIVE_ALERT,
        payload: id
    });
};

export const removeAlert = (id, timeout) => dispatch => {
    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id
        })
    }, timeout);
};