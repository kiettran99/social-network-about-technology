import {
    GET_PROFILE, CLEAR_PROFILE, UPDATE_PROFILE,
    PROFILE_ERROR
} from '../actions/types';

const initialState = {
    profile: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                loading: false,
                profile: payload
            };
        case CLEAR_PROFILE:
            return {
                ...state,              
                loading: true,
                profile: null
            };
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};