import axios from 'axios';
import urlAPI from '../.../../../../../../utils/urlAPI';

export const purchaseAds = async (adsId, edit) => {
    try {

        const query = edit ? '?edit=true': '';

        const res = await axios.post(`${urlAPI}/api/ads/${adsId}/purchase` + query);

        window.location = res.data;
    }
    catch (e) {
        console.log(e);
    }
}