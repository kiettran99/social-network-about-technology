import api from './index';

export const getReports = () => {
    return api.get(api.url.report).then(res => res.data);
};

export const getPost = (id) => {
    return api.get(`${api.url.post}/${id}`).then(res => res.data);
}

export const getUser = (userId) => {
    return api.get(`${api.url.report}/user/${userId}`).then(res => res.data);
};

export const blockPost = (postId) => {
    return api.patch(`${api.url.report}/block/post/${postId}`).then(res => res.data);
}

export const unblockPost = (postId) => {
    return api.patch(`${api.url.report}/unblock/post/${postId}`).then(res => res.data);
}

export const lockAcc = async (id) => {
    return api.put(`https://tlcn-social-network-api.herokuapp.com/api/users/look/${id}`).then(res => {
        return res.data;
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
}

export const unlockAcc = async (id) => {
    return api.put(`https://tlcn-social-network-api.herokuapp.com/api/users/unlook/${id}`).then(res => {
        return res.data;
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    })
}