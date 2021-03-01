import {
    ADD_REVIEW, GET_REVIEWS, GET_REVIEW, REVIEW_ERROR, RESET_REVIEW,
    GET_POST
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

export const getReviews = (skip = 0, limit = 5) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/reviews?limit=${limit}&skip=${skip}`);

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

export const resetReview = () => dispatch => {
    dispatch({
        type: RESET_REVIEW
    });
};