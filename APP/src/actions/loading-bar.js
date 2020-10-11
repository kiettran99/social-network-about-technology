import { IDLE_LOADING, REQUEST_LOADING, COMPLETE_LOADING } from './types';

export const setIdle = () => ({
    type: IDLE_LOADING
});

export const setRequest = () => ({
    type: REQUEST_LOADING
});

export const setComplete = () => ({
    type: COMPLETE_LOADING
});k