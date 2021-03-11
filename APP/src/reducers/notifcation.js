import {
    NOTIFICATION_LOADED, NOTIFICATION_ERROR, FOLLOWING_NOTIFICATION,
    UNFOLLOWING_NOTIFICATION, MAKE_AS_READ_NOTIFICATION, CLEAR_NOTIFICATION,
    GET_MORE_NOTIFICATION, FOLLOWING_FRIEND, UNFOLLOWING_FRIEND
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
        case GET_MORE_NOTIFICATION:
            return {
                ...state,
                loading: false,
                notification: {
                    ...state.notification,
                    messages: [...state.notification.messages, ...payload]
                }
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
        case FOLLOWING_FRIEND:
            return {
                ...state,
                loading: false,
                notification: {
                    ...state.notification,
                    followingFriends: [...state.notification.followingFriends, payload]
                }
            };
        case UNFOLLOWING_FRIEND:
            return {
                ...state,
                loading: false,
                notification: {
                    ...state.notification,
                    followingFriends: state.notification.followingFriends.filter(friend => friend !== payload)
                }
            };
        default:
            return state;
    }
};