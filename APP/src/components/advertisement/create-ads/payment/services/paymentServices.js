import axios from 'axios';
import urlAPI from '../.../../../../../../utils/urlAPI';

export const purchaseAds = async (adsId) => {
    try {
        const res = await axios.post(`${urlAPI}/api/ads/${adsId}/purchase`);

        window.location = res.data;
    }
    catch (e) {
        console.log(e);
    }
}