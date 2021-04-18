import axios from 'axios';
import urlAPI from '../../../utils/urlAPI';

export const getPosts = (headline) => {
    const filter = headline ? `?headline=${headline}` : '';

    // Call API get a list Posts owner and filter by headline.
    return axios.get(`${urlAPI}/api/ads/posts` + filter).then(res => res.data);
};

export const checkNameExisted = (name) => {
    const query = name ? `?name=${name}` : '';

    // Call API get a status name comppaign
    return axios.get(`${urlAPI}/api/ads/check-ads` + query).then(res => res.data);
};

export const createAds = async (data) => {
    try {
        const res = await axios.post(`${urlAPI}/api/ads`, data);

        return res.data;
    }
    catch (e) {
        console.log({ e });
    }
};