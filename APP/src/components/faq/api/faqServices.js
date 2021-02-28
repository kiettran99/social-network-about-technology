import axios from 'axios';
import urlAPI from '../../../utils/urlAPI';

export const getFaqs = async () => {
    try {
        const res = await axios.get(`${urlAPI}/api/faq`);

        return res.data;
    }
    catch (e) {
        console.log(e);
        return [];
    }
};
