import {
    ADD_REVIEW, GET_REVIEWS, GET_REVIEW, REVIEW_ERROR, RESET_REVIEW, EDIT_REVIEW
} from '../actions/types';

const initialState = {
    reviews: [],
    review: null,
    loading: false,
    errors: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_REVIEW:
            return {
                ...state,
                loading: false,
                reviews: [payload, ...state.reviews]
            };
        case GET_REVIEWS:
            return {
                ...state,
                loading: false,
                reviews: payload
            };
        case GET_REVIEW:
        case EDIT_REVIEW:
            return {
                ...state,
                loading: false,
                review: payload
            };
        case REVIEW_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        case RESET_REVIEW:
            return initialState;
        default:
            return state;
    }
};