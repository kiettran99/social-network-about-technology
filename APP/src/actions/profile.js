import {
    GET_PROFILE, CLEAR_PROFILE, UPDATE_PROFILE, PROFILE_ERROR,
    REQUEST_LOADING, COMPLETE_LOADING
} from './types';
import { loadUser } from './auth';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';

export const getMeProfile = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_PROFILE
        });

        dispatch({
            type: REQUEST_LOADING
        });

        const res = await axios.get(`${urlAPI}/api/profile/me`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }
    catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        }); 
    }
};

export const getProfileById = (id) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_PROFILE
        });

        dispatch({
            type: REQUEST_LOADING
        });

        const res = await axios.get(`${urlAPI}/api/profile/user/${id}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }
    catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        }); 
    }
};

export const updateProfile = (formData) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_PROFILE
        });

        dispatch({
            type: REQUEST_LOADING
        });

        const res = await axios.put(`${urlAPI}/api/profile/me`, formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(loadUser());
    }
    catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        }); 
    }
};
