import { GET_GROUPS, GET_GROUP, GROUP_ERROR, CLEAR_GROUP } from './types';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';

export const getGroups = (skip = 0, limit = 5) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/groups?skip=${skip}&limit=${limit}`);

        dispatch({
            type: GET_GROUPS,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: GROUP_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        })
    }
};

export const getGroup = (id, history) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_GROUP
        });
    
        const res = await axios.get(`${urlAPI}/api/groups/${id}`);

        dispatch({
            type: GET_GROUP,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);
        
        dispatch({
            type: GROUP_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        })

        history.push('/notfound');
    }
};