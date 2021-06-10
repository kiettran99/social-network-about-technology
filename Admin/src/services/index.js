import axios from 'axios';

const url = {
    baseUrl: 'https://radiun42-tlcn-mang-xa-hoi-may-tinh-dien-thoai-gv4q-3001.githubpreview.dev/api',
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