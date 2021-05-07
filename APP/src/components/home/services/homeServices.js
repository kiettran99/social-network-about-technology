import axios from 'axios';
import urlAPI from '../../../utils/urlAPI';

export const getAds = async () => {
    try {
        const res = await axios.get(`${urlAPI}/api/ads`);

        return res.data;
    }
    catch (e) {
        // Print errors and return empty array.
        console.log(e);

        return [];
    }
};