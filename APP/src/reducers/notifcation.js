import {
    NOTIFICATION_LOADED, NOTIFICATION_ERROR, FOLLOWING_NOTIFICATION,
    UNFOLLOWING_NOTIFICATION, MAKE_AS_READ_NOTIFICATION, CLEAR_NOTIFICATION
} from '../actions/types';

const initState = {
    notification: null,
    loading: true,
    errors: {}
};

export default function (state = initState, action) {
    const { type, payload } = action;

    switch (type) {
        case NOTIFICATION_LOADED:
        case FOLLOWING_NOTIFICATION:
        case UNFOLLOWING_NOTIFICATION:
        case MAKE_AS_READ_NOTIFICATION:
            return {
                ...state,
                loading: false,
                notification: payload
            };
        case CLEAR_NOTIFICATION:
            return {
                ...state,
                loading: true,
                notification: null,
                errors: {}
            };
        case NOTIFICATION_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        default:
            return state;
    }
};