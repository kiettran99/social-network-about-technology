import {
    GET_HARDWARE_CPU, GET_HARDWARE_MOTHERBOARD, GET_HARDWARE_RAM,
    GET_HARDWARE_GRAPHICS, HARDWARE_ERROR, RELOAD_HARDWARE
} from '../actions/types';

const initalState = {
    cpus: null,
    motherboards: null,
    rams: null,
    graphics: null,
    loading: true,
    errors: {}
};

export default function (state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_HARDWARE_CPU:
            return {
                ...state,
                cpus: payload,
                loading: false
            };
        case GET_HARDWARE_MOTHERBOARD:
            return {
                ...state,
                motherboards: payload,
                loading: false
            };
        case GET_HARDWARE_RAM:
            return {
                ...state,
                rams: payload,
                loading: false
            };
        case GET_HARDWARE_GRAPHICS:
            return {
                ...state,
                graphics: payload,
                loading: false
            };
        case GET_HARDWARE_GRAPHICS:
            return {
                ...state,
                graphics: payload,
                loading: false
            };
        case RELOAD_HARDWARE:
            return {
                ...state,
                loading: true
            };
        case HARDWARE_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            };
        default:
            return state;
    }
}