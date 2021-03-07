import axios from 'axios';
import urlAPI from '../../../utils/urlAPI';

export const searchUser = async (name = '') => {
    try {
        const res = await axios.get(`${urlAPI}/api/users/search?name=${name}`);
        return res.data;
    }
    catch (e) {
        console.log(e);
    }
};