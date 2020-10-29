import { ADD_POST, GET_POSTS, GET_POST, REMOVE_POST,
    CLEAR_POST, POST_ERROR } from '../actions/types';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';

export const addPost = (formData) => async dispatch => {
    try {
        const res = await axios.post(`${urlAPI}/api/posts`, formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};

// Skip helps passing number comments.
// Limit helps display limit comments.
export const getPost = (id, skip = 0, limit = 3) => async dispatch => {
    try {

        dispatch({
            type: CLEAR_POST
        });

        const res = await axios.get(`${urlAPI}/api/posts/${id}?skip=${skip}&limit=${limit}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};

// Skip helps passing number comments.
// Limit helps display limit comments.
export const getPosts = (skip = 0, limit = 5) => async dispatch => {
    try {

        dispatch({
            type: CLEAR_POST
        });

        const res = await axios.get(`${urlAPI}/api/posts?skip=${skip}&limit=${limit}`);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};

export const removePost = (id) => async dispatch => {
    try {

        dispatch({
            type: CLEAR_POST
        });

        const res = await axios.delete(`${urlAPI}/api/posts/${id}`);

        dispatch({
            type: REMOVE_POST,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};