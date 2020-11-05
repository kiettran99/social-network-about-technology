import {
    ADD_POST, GET_POSTS, GET_POST, REMOVE_POST,
    CLEAR_POST, POST_ERROR, GET_MORE_POSTS,
    REQUEST_LOADING, COMPLETE_LOADING,
    ADD_COMMENT, REMOVE_COMMENT, UPDATE_LIKES,
    UPDATE_LIKES_COMMENT, ADD_REPLY_COMMENT, REMOVE_REPLY_COMMENT,
    UPDATE_LIKES_REPLY
} from '../actions/types';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';
import { setAlert } from '../actions/alert';

export const addPost = (formData) => async dispatch => {
    try {
        dispatch({
            type: REQUEST_LOADING
        });

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
    finally {
        dispatch({
            type: COMPLETE_LOADING
        });
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
            type: REQUEST_LOADING
        });

        const res = await axios.get(`${urlAPI}/api/posts?skip=${skip}&limit=${limit}`);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    }
    catch (e) {
        if (e.message === 'Network Error') {
            dispatch({
                type: POST_ERROR,
                payload: e.message
            })
        }
        else {
            dispatch({
                type: POST_ERROR,
                payload: { msg: e.response.data, status: e.response.statusText }
            })
        }
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        });
    }
};

export const getMorePosts = (skip = 0, limit = 5) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/posts?skip=${skip}&limit=${limit}`);

        dispatch({
            type: GET_MORE_POSTS,
            payload: res.data
        });
    }
    catch (e) {
        if (e.message === 'Network Error') {
            dispatch({
                type: POST_ERROR,
                payload: e.message
            })
        }
        else {
            dispatch({
                type: POST_ERROR,
                payload: { msg: e.response.data, status: e.response.statusText }
            })
        }
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

export const likePost = (id) => async dispatch => {
    try {
        const res = await axios.put(`${urlAPI}/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: res.data,
            id
        });
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

export const unlikePost = (id) => async dispatch => {
    try {
        const res = await axios.put(`${urlAPI}/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: res.data,
            id
        });
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};


export const addComment = (postId, formData) => async dispatch => {
    try {
        dispatch({
            type: REQUEST_LOADING
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put(`${urlAPI}/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
            id: postId
        });

        dispatch(setAlert('Comment Added', 'success'));
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        });
    }
}

export const removeComment = (postId, commentId) => async dispatch => {
    try {
        dispatch({
            type: REQUEST_LOADING
        });

        await axios.delete(`${urlAPI}/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId,
            id: postId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        });
    }
};

export const likeComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.put(`${urlAPI}/api/posts/${postId}/comments/like/${commentId}`);

        dispatch({
            type: UPDATE_LIKES_COMMENT,
            payload: res.data,
            id: postId
        });
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
}


export const unlikeComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.put(`${urlAPI}/api/posts/${postId}/comments/unlike/${commentId}`);

        dispatch({
            type: UPDATE_LIKES_COMMENT,
            payload: res.data,
            id: postId
        });
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
}

export const addReplyComment = (postId, commentId, formData) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put(`${urlAPI}/api/posts/${postId}/comments/reply/${commentId}`,
            formData, config);

        dispatch({
            type: ADD_REPLY_COMMENT,
            payload: res.data,
            id: postId
        });
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
}

export const removeReplyComment = (postId, commentId, replyId) => async dispatch => {
    try {
        dispatch({
            type: REQUEST_LOADING
        });

        const res = await axios.delete(`${urlAPI}/api/posts/${postId}/comments/reply/${commentId}/${replyId}`);

        dispatch({
            type: REMOVE_REPLY_COMMENT,
            payload: res.data,
            id: postId
        });
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        });
    }
}

export const likeReplyComment = (postId, commentId, replyId) => async dispatch => {
    try {

        const res = await axios.put(`${urlAPI}/api/posts/${postId}/comments/${commentId}/reply/like/${replyId}`);

        dispatch({
            type: UPDATE_LIKES_REPLY,
            payload: res.data,
            id: postId
        });
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
}

export const unlikeReplyComment = (postId, commentId, replyId) => async dispatch => {
    try {

        const res = await axios.put(`${urlAPI}/api/posts/${postId}/comments/${commentId}/reply/unlike/${replyId}`);

        dispatch({
            type: UPDATE_LIKES_REPLY,
            payload: res.data,
            id: postId
        });
    }
    catch (e) {
        console.log(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
}