import axios from 'axios';
import urlAPI from '../../../../../utils/urlAPI';

export const createReport = async (body) => {
    try {
        const res = await axios.post(`${urlAPI}/api/reports`, body);

        return res.data;
    }
    catch (e) {
        console.log(e);

        throw new Error(e);
    }
};