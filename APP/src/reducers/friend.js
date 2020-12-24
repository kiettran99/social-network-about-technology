import {
    GET_FRIENDS, GET_REQUEST_FRIENDS, GET_USERS_FRIENDS,
    FRIEND_ERROR, REQUEST_FRIEND,
    ACCEPT_FRIEND, UNACCEPT_FRIEND, CLEAR_FRIEND, GET_MORE_FRIENDS, GET_MORE_REQUESTS, GET_MORE_USERS, RESET_FRIEND
} from '../actions/types';

const initialState = {
    friends: [],
    requests: [],
    users: [],
    loading: false,
    errors: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_FRIENDS:
            return {
                ...state,
                loading: false,
                friends: payload
            };
        case GET_REQUEST_FRIENDS:
            return {
                ...state,
                loading: false,
                requests: payload
            };
        case GET_USERS_FRIENDS:
            return {
                ...state,
                loading: false,
                users: payload
            };
        case GET_MORE_FRIENDS:
            return {
                ...state,
                loading: false,
                friends: [...state.friends, ...payload]
            };
        case GET_MORE_REQUESTS:
            return {
                ...state,
                loading: false,
                requests: [...state.requests, ...payload]
            };
        case GET_MORE_USERS:
            return {
                ...state,
                loading: false,
                users: [...state.users, ...payload]
            };
        case FRIEND_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        case RESET_FRIEND:
            return initialState;
        case REQUEST_FRIEND:
        case ACCEPT_FRIEND:
        case UNACCEPT_FRIEND:
            return {
                ...state,
                loading: false,
                [action.reference]: state[action.reference].map(element => {
                    if (element._id === payload.userId) {
                        return {
                            ...element,
                            friendsStatus: payload.status
                        };
                    }

                    return element;
                })
            };
        default:
            return state;
    }
};