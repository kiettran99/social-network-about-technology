import api from './index';

export const getCollaborators = () => {
    return api.get(`${api.url.user}/admin/collaborators`).then(res => res.data);
}

export const inviteToCollaborators = (data) => {
    return api.patch(`${api.url.user}/admin/collaborators`, data).then(res => res.data);
}

export const removeCollaborators = (userId) => {
    return api.patch(`${api.url.user}/${userId}/admin/collaborators/remove`).then(res => res.data);
}

export const searchUsers = (name = "") => {
    return api.get(`${api.url.user}/search?name=${name}`).then(res => res.data);
}