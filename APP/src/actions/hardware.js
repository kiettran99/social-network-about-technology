import {
    GET_HARDWARE_CPU, GET_HARDWARE_MOTHERBOARD, GET_HARDWARE_RAM,
    GET_HARDWARE_GRAPHICS, HARDWARE_ERROR, RELOAD_HARDWARE
} from './types';
import axios from 'axios';
import urlAPI from '../utils/urlAPI';

const queryString = (part) => part ? `&part=${part}`: '';

export const getHardwareCPU = (part) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/hardwares?category=CPU${queryString(part)}`);

        dispatch({
            type: GET_HARDWARE_CPU,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: HARDWARE_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

export const getHardwareMotherboard = (part) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/hardwares?category=montherboard${queryString(part)}`);

        dispatch({
            type: GET_HARDWARE_MOTHERBOARD,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: HARDWARE_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

export const getHardwareRam = (part) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/hardwares?category=ram${queryString(part)}`);

        dispatch({
            type: GET_HARDWARE_RAM,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: HARDWARE_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};

export const getHardwareGraphics = (part) => async dispatch => {
    try {
        const res = await axios.get(`${urlAPI}/api/hardwares?category=graphics${queryString(part)}`);

        dispatch({
            type: GET_HARDWARE_GRAPHICS,
            payload: res.data
        });
    }
    catch (e) {
        console.log(e);

        dispatch({
            type: HARDWARE_ERROR,
            payload: { msg: e.response.data, status: e.response.statusText }
        });
    }
};