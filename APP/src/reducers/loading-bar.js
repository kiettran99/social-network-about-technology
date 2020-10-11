import { IDLE_LOADING, REQUEST_LOADING, COMPLETE_LOADING } from '../actions/types';

const initialState = IDLE_LOADING;

export default function (state = initialState, action) {
    const { type } = action;

    switch (type) {
        case IDLE_LOADING:
            return IDLE_LOADING;
        case REQUEST_LOADING:
            return REQUEST_LOADING;
        case COMPLETE_LOADING:
            return COMPLETE_LOADING;
        default:
            return state;
    }
};