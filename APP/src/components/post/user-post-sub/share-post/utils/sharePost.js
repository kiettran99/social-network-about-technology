import axios from 'axios';
import urlAPI from '../../../../../utils/urlAPI';

export const sharePostTimeLine = async (postId, formData) => {
    try {
        const res = await axios.put(`${urlAPI}/api/posts/${postId}/share`, formData);
        return res.data;
    }
    catch (e) {
        console.log(e);
    }
}