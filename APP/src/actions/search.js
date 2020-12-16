import {
    SEARCH_LOADING, SEARCH_USERS, ERROR_SEARCH
} from './types';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';

export const searchUsers = (name, limit = 3, skip = 0) => async dispatch => {
    try {
        dispatch({
            type: SEARCH_LOADING
        });

        const res = await axios.get(`${urlAPI}/api/users/search?name=${name}&skip=${skip}&limit=${limit}`)

        dispatch({
            type: SEARCH_USERS,
            payload: res.data
        });
    }
    catch (e) {
        console.log({ e });

        dispatch({
            type: ERROR_SEARCH,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};