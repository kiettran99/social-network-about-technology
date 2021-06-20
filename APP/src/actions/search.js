import {
    SEARCH_LOADING, SEARCH_USERS, ERROR_SEARCH, RESET_SEARCH, SEARCH_POSTS,
    GET_MORE_SEARCH_POSTS, GET_MORE_SEARCH_USERS
} from './types';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';
import { createQueryName } from '../utils/search/search';

export const searchUsers = (name, search, limit = 3, skip = 0) => async dispatch => {
    try {
        dispatch({
            type: SEARCH_LOADING
        });

        const res = await axios.get(`${urlAPI}/api/users/search?name=${name}&skip=${skip}&limit=${limit}`)

        dispatch({
            type: SEARCH_USERS,
            payload: res.data,
            search
        });
    }
    catch (e) {
        console.log({ e });

        dispatch({
            type: ERROR_SEARCH,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};

export const searchPosts = (name, limit = 4, skip = 0) => async dispatch => {
    try {

        const body = createQueryName(name);

        // Logic search -> headline or hashtags
        const res = await axios.post(`${urlAPI}/api/posts/search?skip=${skip}&limit=${limit}`, body);

        dispatch({
            type: SEARCH_POSTS,
            payload: res.data
        });
    }
    catch (e) {
        console.log({ e });

        dispatch({
            type: ERROR_SEARCH,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};

export const resetSearch = () => dispatch => {
    dispatch({
        type: RESET_SEARCH
    });
};

export const getMoreUsers = (name = '', limit = 3, skip = 0, callback) => async dispatch => {
    try {

        const res = await axios.get(`${urlAPI}/api/users/search?name=${name}&skip=${skip}&limit=${limit}`)

        dispatch({
            type: GET_MORE_SEARCH_USERS,
            payload: res.data,
        });

        callback();
    }
    catch (e) {
        console.log({ e });

        dispatch({
            type: ERROR_SEARCH,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};

export const getMorePosts = (name = '', limit = 4, skip = 0, callback) => async dispatch => {
    try {

        const body = createQueryName(name);

        // Logic search -> headline or hashtags
        const res = await axios.post(`${urlAPI}/api/posts/search?skip=${skip}&limit=${limit}`, body);

        dispatch({
            type: GET_MORE_SEARCH_POSTS,
            payload: res.data
        });

        callback();
    }
    catch (e) {
        console.log({ e });

        dispatch({
            type: ERROR_SEARCH,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};