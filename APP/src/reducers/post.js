import { ADD_POST, GET_POSTS, GET_POST, REMOVE_POST,
CLEAR_POST, POST_ERROR } from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    errors: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [...state.posts, payload]
            };
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload
            };
        case GET_POST:
            return {
                ...state,
                loading: false,
                post: payload
            };
        case CLEAR_POST:
            return {
                ...state,
                loading: true,
                post: null
            };
        case REMOVE_POST:
            const { posts: { _id } }  = payload;
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== _id)
            };
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        default:
            return state;
    }
};