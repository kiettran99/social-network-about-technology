import axios from 'axios';

// @function Add headers configure default.
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `BEARER ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;