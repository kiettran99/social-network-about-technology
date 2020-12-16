import {
    SEARCH_LOADING, SEARCH_USERS, ERROR_SEARCH
} from '../actions/types';

const initialState = {
    users: null,
    loading: true,
    errors: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SEARCH_LOADING:
            return {
                ...state,
                loading: true
            };
        case SEARCH_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            };
        case ERROR_SEARCH:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        default:
            return state;
    }
}