import {
    GET_BUILD_PARTS, RATING_BUILD_PARTS, BUILD_PARTS_ERROR,
    LOADING_BUILD_PARTS
} from './types';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';

export const getBuildParts = (id) => async dispatch => {
    try {
        dispatch({
            type: LOADING_BUILD_PARTS
        });

        const res = await axios.get(`${urlAPI}/api/build-parts//${id}`);

        dispatch({
            type: GET_BUILD_PARTS,
            payload: res.data
        });
    }
    catch (e) {
        dispatch({
            type: BUILD_PARTS_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

export const ratingBuildParts = (id, overall) => async dispatch => {
    try {
        dispatch({
            type: LOADING_BUILD_PARTS
        });

        const res = await axios.put(`${urlAPI}/api/build-parts//${id}/rating`, {
            overall
        });

        dispatch({
            type: RATING_BUILD_PARTS,
            payload: res.data
        });
    }
    catch (e) {
        dispatch({
            type: BUILD_PARTS_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};