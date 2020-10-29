import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import product from './product';
import loadingBar from './loading-bar';
import notification from './notifcation';
import post from './post';

export default combineReducers({
    alert,
    auth,
    product,
    loadingBar,
    notification,
    post
});