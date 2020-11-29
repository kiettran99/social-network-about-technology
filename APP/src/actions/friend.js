import {
    GET_FRIENDS, GET_REQUEST_FRIENDS, GET_USERS_FRIENDS,
    FRIEND_ERROR, REQUEST_FRIEND,
    ACCEPT_FRIEND, UNACCEPT_FRIEND, CLEAR_FRIEND, GET_MORE_FRIENDS
} from './types';

import urlAPI from '../utils/urlAPI';
import axios from 'axios';

// Get List friends
export const getFriends = (skip = 0, limit = 5) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_FRIEND
        });

        const res = await axios.get(`${urlAPI}/api/friends/get-friends?skip=${skip}&limit=${limit}`);

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

export const getMoreFriends = (skip = 0, limit = 5) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/friends/get-friends?skip=${skip}&limit=${limit}`);
        
        dispatch({
            type: GET_MORE_FRIENDS,
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

// Get List friends
export const getFriendsById = (id, skip = 0, limit = 5) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_FRIEND
        });

        const res = await axios.get(`${urlAPI}/api/friends/get-friends/${id}?skip=${skip}&limit=${limit}`);

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

// Get List friends
export const getRequests = (skip = 0, limit = 5) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_FRIEND
        });

        const res = await axios.get(`${urlAPI}/api/friends/get-request?skip=${skip}&limit=${limit}`);

        dispatch({
            type: GET_REQUEST_FRIENDS,
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

// Get List user not friend and pending.
export const getUsers = (skip = 0, limit = 5) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_FRIEND
        });

        const res = await axios.get(`${urlAPI}/api/friends/get-user?skip=${skip}&limit=${limit}`);

        dispatch({
            type: GET_USERS_FRIENDS,
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
// reference object to state.
export const requestFriend = (recipientId, reference) => async dispatch => {
    try {
        const res = await axios.put(`${urlAPI}/api/friends/request/${recipientId}`);

        dispatch({
            type: REQUEST_FRIEND,
            payload: res.data,
            reference
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
export const acceptFriend = (requesterId, reference) => async dispatch => {
    try {
        const res = await axios.put(`${urlAPI}/api/friends/accept/${requesterId}`);

        dispatch({
            type: ACCEPT_FRIEND,
            payload: res.data,
            reference
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
export const unAcceptFriend = (requesterId, reference) => async dispatch => {
    try {
        const res = await axios.put(`${urlAPI}/api/friends/unaccept/${requesterId}`);

        dispatch({
            type: UNACCEPT_FRIEND,
            payload: res.data,
            reference
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