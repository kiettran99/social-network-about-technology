import axios from 'axios';
import fileDownload from 'js-file-download';
import dayjs from 'dayjs';

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

export const hasUserCreatedAds = async () => {
    try {
        const res = await axios.get(`${urlAPI}/api/ads/create/status`);

        return res.data;
    }
    catch (e) {
        console.log({ e });

        return false;
    }
};

export const getListAds = async ({ skip, limit, selectedPage, search, viewAs, ...rest }) => {
    try {

        const options = {
            skip, limit,
            page: selectedPage, search, viewAs,
            ...rest
        };

        let query = '?';

        if (options) {
            for (const [key, value] of Object.entries(options)) {
                if (value) {
                    query += `${key}=${value}&`;
                }
            }

            query = query.slice(0, -1);
        }

        const res = await axios.get(`${urlAPI}/api/ads/list` + query);

        return res.data;
    }
    catch (e) {
        console.log({ e });

        return [];
    }
};

export const handleClickAds = async (id) => {
    try {
        const res = await axios.put(`${urlAPI}/api/ads/${id}/click`);

        return res.data;
    }
    catch (e) {
        console.log({ e });
    }
};

export const toggleStatusCompaign = async (id) => {
    try {
        const res = await axios.patch(`${urlAPI}/api/ads/${id}/status`);

        return res.data;
    }
    catch (e) {
        console.log({ e });
    }
};

export const getAdById = async (id) => {
    try {
        const res = await axios.get(`${urlAPI}/api/ads/${id}`);

        return res.data;
    }
    catch (e) {
        console.log({ e });
    }
};

export const editAds = async (id, data) => {
    try {
        const res = await axios.put(`${urlAPI}/api/ads/${id}`, data);

        return res.data;
    }
    catch (e) {
        console.log({ e });
    }
};

export const getReportExcel = async () => {
    try {
        const res = await axios.get(`${urlAPI}/api/ads/export/excel`, {
            responseType: 'blob'
        });

        fileDownload(res.data, `Report Ads on ${dayjs().format('YYYY-MM-DD')}.xlsx`);
    }
    catch (e) {
        console.log(e);
    }
};