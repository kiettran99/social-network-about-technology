import {
    GET_FRIENDS, FRIEND_ERROR, REQUEST_FRIEND,
    ACCEPT_FRIEND, UNACCEPT_FRIEND, CLEAR_FRIEND
} from '../actions/types';

const initialState = {
    friends: [],
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
                firends: payload
            };
        case FRIEND_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        case CLEAR_FRIEND:
            return {
                ...state,
                loading: false,
                friends: []
            };
        case REQUEST_FRIEND:
        case ACCEPT_FRIEND:
        case UNACCEPT_FRIEND:
            return {
                ...state,
                loading: false,
                friends: state.friends.map(friend => {
                    if (friend === payload.requesterId) {
                        return {
                            ...friend,
                            friendsStatus: status
                        };
                    }

                    return friend;
                })
            };
        default:
            return state;
    }
};