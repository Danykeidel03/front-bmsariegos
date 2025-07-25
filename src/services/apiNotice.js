import axios from "axios";

const URL_API = 'http://localhost:3005';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true
})

const objServices = {
    createNotice: (noticeData) => api.post('/notice/', noticeData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    getNotices: () => api.get('/notice')
}

export default objServices;