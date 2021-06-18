import axios from 'axios';
import urlAPI from '../../../utils/urlAPI';

export const getFriendStatus = async (userId) => {
    try {
        const res = await axios.get(`${urlAPI}/api/friends/friend/${userId}`);
        return res.data;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

// Request to recipient to add friend.
// reference object to state.
export const requestFriend = async (recipientId) => {
    try {
        const res = await axios.put(`${urlAPI}/api/friends/request/${recipientId}`);

        return res.data;
    }
    catch (e) {
        console.log(e);
    }
};

// Accept from requester to add friend.
export const acceptFriend = async (requesterId) => {
    try {
        const res = await axios.put(`${urlAPI}/api/friends/accept/${requesterId}`);

        return res.data;
    }
    catch (e) {
        console.log(e);
    }
};

// UnAccept from requester to add friend.
export const unAcceptFriend = async (requesterId) => {
    try {
        const res = await axios.put(`${urlAPI}/api/friends/unaccept/${requesterId}`);

        return res.data;
    }
    catch (e) {
        console.log(e);
    }
};