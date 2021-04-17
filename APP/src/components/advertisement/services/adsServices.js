import axios from 'axios';
import urlAPI from '../../../utils/urlAPI';

export const getPosts = (headline) => {
    const filter = headline ? `?headline=${headline}}` : '';

    // Call API get a list Posts owner and filter by headline.
    return axios.get(`${urlAPI}/api/ads/posts` + filter).then(res => res.data);
};