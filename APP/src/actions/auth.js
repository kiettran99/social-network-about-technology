import {
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,
    REQUEST_LOADING, COMPLETE_LOADING,
    REQUEST_RESET_PASSWORD, RESET_PASSWORD
} from '../actions/types';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

// @desc Request API get user by token
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${urlAPI}/api/auth`);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }
    catch (e) {
         console.log(e);

        if (e.response?.status === 401) {
            dispatch({
                type: AUTH_ERROR
            })
        } 
    }
};

//Login user
export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        username,
        password
    };

    try {
        dispatch({
            type: REQUEST_LOADING
        });

        const res = await axios.post(`${urlAPI}/api/auth`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert('Successfully login', 'Login', 'success', 2000));

        dispatch(loadUser());
    }
    catch (e) {
        console.log(e);

        const errors = e.response.data.errors;

        if (errors) {
            errors.map(error => dispatch(setAlert(error.msg, 'Authentication', 'error', 2000)));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        });
    }
};

//Register user
export const register = ({ username, password, country, email, fullname }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        username,
        password,
        country,
        email,
        fullname
    };

    try {
        dispatch({
            type: REQUEST_LOADING
        });

        const res = await axios.post(`${urlAPI}/api/users/register`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    }
    catch (e) {
        console.log(e.response);

        const errors = e.response.data.errors;

        if (errors) {
            errors.map(error => dispatch(setAlert(error.message, 'dangger')));
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        });
    }
};

//Logout user
export const logout = (history) => async dispatch => {
    try {
        dispatch({
            type: REQUEST_LOADING
        });

        await axios.get(`${urlAPI}/api/auth/logout`);

        dispatch({
            type: LOGOUT
        });

        dispatch(setAlert('Logout successfully !', 'success', 2000));

        history.push('/login');
    }
    catch (e) {
        console.log(e);
    }
    finally {
        dispatch({
            type: COMPLETE_LOADING
        });
    }
};

// Request to forgot password
export const requestForgotPassword = (formData) => async dispatch => {
    try {
        await axios.post(`${urlAPI}/api/auth/reset-password`, formData);

        dispatch({
            type: REQUEST_RESET_PASSWORD,
            payload: true
        });
    }
    catch (e) {
        console.log(e);
    }
};

// Reset new Password 
export const resettPassword = (token, formData) => async dispatch => {
    try {
        const res = await axios.post(`${urlAPI}/api/auth/reset-password/${token}`, formData);

        console.log(res.data);

        dispatch({
            type: RESET_PASSWORD,
            payload: true
        });
    }
    catch (e) {
        console.log(e);
    }
};