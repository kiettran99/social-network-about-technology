import {
    ADD_REVIEW, GET_REVIEWS, GET_REVIEW, REVIEW_ERROR, RESET_REVIEW,
    GET_POST, EDIT_REVIEW, REMOVE_REVIEW, EDIT_POST, REMOVE_POST, EDIT_TITLE_REVIEW,
    GET_MORE_REVIEWS
} from './types';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';

export const addReview = (formData, callback) => async dispatch => {
    try {
        const res = await axios.post(`${urlAPI}/api/reviews`, formData);

        dispatch({
            type: ADD_REVIEW,
            payload: res.data,
        });

        callback('Successfully create a review.', true);
    }
    catch (e) {

        console.log(e);

        callback('Failed create a review.', false);

        dispatch({
            type: REVIEW_ERROR,
            payload: { msg: e.response?.data, status: e.response?.statusText }
        });
    }
};

export const getReviews = (skip = 0, limit = 5, title = '', filterBy = 'all') => async dispatch => {
    try {
        const titleQuery = title ? `&title=${title}` : '';

        const filterByQuery = filterBy ? `&filterBy=${filterBy}` : '';

        const query = titleQuery + filterByQuery;

        const res = await axios.get(`${urlAPI}/api/reviews?limit=${limit}&skip=${skip}` + query);
        console.log(res)
        dispatch({
            type: GET_REVIEWS,
            payload: res.data,
        });
    }
    catch (e) {

        dispatch({
            type: REVIEW_ERROR,
            payload: { msg: e.response?.data, status: e.response?.statusText }
        });
    }
};

export const getReview = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/reviews/${id}`);

        dispatch({
            type: GET_REVIEW,
            payload: res.data,
        });

        dispatch({
            type: GET_POST,
            payload: res.data?.post
        });
    }
    catch (e) {

        history.push('/notfound');

        dispatch({
            type: REVIEW_ERROR,
            payload: { msg: e.response?.data, status: e.response?.statusText }
        });
    }
};


export const editReview = (id, formData, callback) => async dispatch => {
    try {
        const res = await axios.put(`${urlAPI}/api/reviews/${id}`, formData);

        dispatch({
            type: EDIT_REVIEW,
            payload: res.data,
        });

        dispatch({
            type: EDIT_TITLE_REVIEW,
            payload: formData.get('title')
        });

        callback('Successfully edit a review.', true);
    }
    catch (e) {

        console.log(e);

        callback('Failed create a review.', false);

        dispatch({
            type: REVIEW_ERROR,
            payload: { msg: e.response?.data, status: e.response?.statusText }
        });
    }
};

export const removeReview = (id, history) => async dispatch => {
    try {
        await axios.delete(`${urlAPI}/api/reviews/${id}`);

        dispatch({
            type: REMOVE_REVIEW,
        });

        dispatch({
            type: REMOVE_POST
        });

        alert('Removing review successfully')

        history.push('/reviews');
    }
    catch (e) {

        history.push('/notfound');

        dispatch({
            type: REVIEW_ERROR,
            payload: { msg: e.response?.data, status: e.response?.statusText }
        });
    }
};

export const resetReview = () => dispatch => {
    dispatch({
        type: RESET_REVIEW
    });
};

export const getMoreReviews = (skip = 0, limit = 5, title = '', filterBy = 'all', callback) => async dispatch => {
    try {
        const titleQuery = title ? `&title=${title}` : '';

        const filterByQuery = filterBy ? `&filterBy=${filterBy}` : '';

        const query = titleQuery + filterByQuery;

        const res = await axios.get(`${urlAPI}/api/reviews?limit=${limit}&skip=${skip}` + query);

        dispatch({
            type: GET_MORE_REVIEWS,
            payload: res.data,
        });

        callback();
    }
    catch (e) {

        dispatch({
            type: REVIEW_ERROR,
            payload: { msg: e.response?.data, status: e.response?.statusText }
        });
    }
}