import {
    CHAT_ERROR,
    GET_PREVIEW_MESSAGE_BOX, GET_USER_PROFILE
} from '../actions/types';

const initialState = {
    previewMessageBox: [],
    userProfile: null,
    errors: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PREVIEW_MESSAGE_BOX:
            return {
                ...state,
                previewMessageBox: payload
            };
        case GET_USER_PROFILE:
            return {
                ...state,
                userProfile: payload
            };
        case CHAT_ERROR:
            return {
                ...state,
                errors: payload
            };
        default:
            return state;
    }
};