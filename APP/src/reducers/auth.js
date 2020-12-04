import {
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REQUEST_RESET_PASSWORD,
    RESET_PASSWORD
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    loading: true,
    isAuthenticated: null,
    isConfirmResetPassword: false
};

// @desc reducer is used in authenticated, Load user data, add token, remote token.
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null,
                user: null,
                isConfirmResetPassword: false
            };
        case REQUEST_RESET_PASSWORD:
        case RESET_PASSWORD:
            return {
                ...state,
                loading: false,
                isConfirmResetPassword: payload
            }
        default:
            return state;
    }
};