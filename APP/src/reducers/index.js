import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import loadingBar from './loading-bar';
import notification from './notifcation';
import post from './post';
import profile from './profiile';
import group from './group';
import friend from './friend';
import hardware from './hardware';
import buildParts from './build-parts';
import search from './search';
import review from './review';
import chat from './chat';

export default combineReducers({
    alert,
    auth,
    loadingBar,
    notification,
    post,
    profile,
    group,
    friend,
    hardware,
    buildParts,
    search,
    review,
    chat
});