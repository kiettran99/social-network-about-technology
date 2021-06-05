import {
    SEARCH_LOADING, SEARCH_USERS, ERROR_SEARCH, SEARCH_POSTS, RESET_SEARCH
} from '../actions/types';

const initialState = {
    users: null,
    posts: null,
    search: '',
    loading: false,
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
                search: action.search,
                loading: false
            };
        case SEARCH_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case ERROR_SEARCH:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        case RESET_SEARCH:
            return initialState;
        default:
            return state;
    }
}