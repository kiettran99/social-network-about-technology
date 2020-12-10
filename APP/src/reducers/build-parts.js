import {
    GET_BUILD_PARTS, RATING_BUILD_PARTS, BUILD_PARTS_ERROR,
    LOADING_BUILD_PARTS
} from '../actions/types';

const initialState = {
    buildParts: null,
    loading: false,
    errors: {}
};;

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_BUILD_PARTS:
        case RATING_BUILD_PARTS:
            return {
                ...state,
                buildParts: payload,
                loading: false
            };
        case BUILD_PARTS_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            };
        case LOADING_BUILD_PARTS:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}