import {
    GET_FRIENDS, FRIEND_ERROR, REQUEST_FRIEND,
    ACCEPT_FRIEND, UNACCEPT_FRIEND, CLEAR_FRIEND
} from './types';

import urlAPI from '../utils/urlAPI';
import axios from 'axios';

// Get List friends
export const getFriends = (skip = 0, limit = 5) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_FRIEND
        });

        const res = await axios.get(`${urlAPI}/api/friends/getall?skip=${skip}&limit=${limit}`);

        dispatch({
            type: GET_FRIENDS,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: FRIEND_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

// Request to recipient to add friend.
export const requestFriend = (recipientId) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/friends/reqeust/${recipientId}`);

        dispatch({
            type: REQUEST_FRIEND,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: FRIEND_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

// Accept from requester to add friend.
export const AcceptFriend = (requesterId) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/friends/accept/${requesterId}`);

        dispatch({
            type: ACCEPT_FRIEND,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: FRIEND_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

// UnAccept from requester to add friend.
export const unAcceptFriend = (requesterId) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/friends/unaccept/${requesterId}`);

        dispatch({
            type: UNACCEPT_FRIEND,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: FRIEND_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};