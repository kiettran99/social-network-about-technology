import axios from 'axios';

const url = {
    baseUrl: 'https://tlcn-social-network-api.herokuapp.com/api',
    report: '/reports',
    post: '/posts',
    user: '/users'
};

const instance = axios.create({
    baseURL: url.baseUrl
});

const api = {
    url,
    instance,
    get: instance.get,
    post: instance.post,
    put: instance.put,
    patch: instance.patch,
    delete: instance.delete
};

export default api;