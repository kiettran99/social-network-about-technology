import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import loadingBar from './loading-bar';
import notification from './notifcation';
import post from './post';
import profile from './profiile';
import group from './group';

export default combineReducers({
    alert,
    auth,
    loadingBar,
    notification,
    post,
    profile,
    group
});