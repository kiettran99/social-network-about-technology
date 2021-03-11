import {
    NOTIFICATION_LOADED, NOTIFICATION_ERROR, FOLLOWING_NOTIFICATION,
    UNFOLLOWING_NOTIFICATION, MAKE_AS_READ_NOTIFICATION, GET_MORE_NOTIFICATION,
    CLEAR_NOTIFICATION, FOLLOWING_FRIEND, UNFOLLOWING_FRIEND
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

export const loadMoreNotification = (skip = 0, limit = 3) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/notification/more?skip=${skip}&limit=${limit}`);

        dispatch({
            type: GET_MORE_NOTIFICATION,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

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

export const followingFriend = (friendId) => async dispatch => {
    try {

       await axios.put(`${urlAPI}/api/users/following/${friendId}`);

        dispatch({
            type: FOLLOWING_FRIEND,
            payload: friendId
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: NOTIFICATION_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

export const unFollowingFriend = (friendId) => async dispatch => {
    try {

       await axios.put(`${urlAPI}/api/users/unfollowing/${friendId}`);

        dispatch({
            type: UNFOLLOWING_FRIEND,
            payload: friendId
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: NOTIFICATION_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};