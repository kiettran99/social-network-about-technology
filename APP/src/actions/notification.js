import {
    NOTIFICATION_LOADED, NOTIFICATION_ERROR, FOLLOWING_NOTIFICATION,
    UNFOLLOWING_NOTIFICATION, MAKE_AS_READ_NOTIFICATION,
    CLEAR_NOTIFICATION
} from '../actions/types';

import urlAPI from '../utils/urlAPI';
import axios from 'axios';

export const loadNotification = (skip = 0, limit = 3) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/notification?skip=${skip}&limit=${limit}`);

        dispatch({
            type: NOTIFICATION_LOADED,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e.response);

        dispatch({
            type: NOTIFICATION_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

export const makeAsReadAll = () => async dispatch => {
    try {
        await axios.put(`${urlAPI}/api/notification/markasreadall`);

        dispatch(loadNotification());
    }
    catch (e) {
        console.log(e.response);

        dispatch(loadNotification());
    }
}

export const makeAsRead = (id) => async dispatch => {
    try {
        await axios.put(`${urlAPI}/api/notification/markasread/${id}`);

        dispatch(loadNotification());
    }
    catch (e) {
        console.log(e.response);

        dispatch({
            type: NOTIFICATION_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
}

export const followingNotification = (id) => async dispatch => {
    try {
        await axios.put(`${urlAPI}/api/notification/following/${id}`);

        dispatch(loadNotification());
    }
    catch (e) {
        console.log(e.response);

        dispatch({
            type: NOTIFICATION_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
}

export const unfollowingNotification = (id) => async dispatch => {
    try {
        await axios.put(`${urlAPI}/api/notification/unfollowing/${id}`);
        dispatch(loadNotification());
    }
    catch (e) {
        console.log(e.response);

        dispatch({
            type: NOTIFICATION_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
}

export const clearNotification = () => ({
    type: CLEAR_NOTIFICATION
})