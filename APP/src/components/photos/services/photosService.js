import axios from 'axios';
import urlAPI from '../../../utils/urlAPI';

export const getPhotos = async (skip = 0, limit = 6) => {
    try {
        const res = await axios.get(`${urlAPI}/api/photos?skip=${skip}&limit=${limit}`);

        return res.data;
    }
    catch (e) {
        console.log(e);
    }
};

export const getPhotosByUserId = async (userId) => {
    try {
        const res = await axios.get(`${urlAPI}/api/photos/${userId}`);

        return res.data;
    }
    catch (e) {
        console.log(e);
    }
};