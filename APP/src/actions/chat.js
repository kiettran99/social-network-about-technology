import {
    GET_PREVIEW_MESSAGE_BOX, GET_USER_PROFILE, CHAT_ERROR
} from './types';

// Get Preview Message box to loading preview some message
export const getPreviewMessageBox = (previewMessageBox) => dispatch => {
    dispatch({
        type: GET_PREVIEW_MESSAGE_BOX,
        payload: previewMessageBox
    });
};

export const getUserProfile = (userProfile) => dispatch => {
    dispatch({
        type: GET_USER_PROFILE,
        payload: userProfile
    });
};

export const getChatErrors = (errors) => dispatch => {
    dispatch({
        type: CHAT_ERROR,
        payload: errors
    });
};