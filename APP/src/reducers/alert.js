// Reducer is pure-function, specify how the application's state changes in change
// to action sent to store.
// @desc Build a reducer. notification ui in website.
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
};