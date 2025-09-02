import axios from "axios";

const URL_API = 'https://back-bmsariegos-production.up.railway.app';

const api = axios.create({
    baseURL: URL_API,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'x-api-key': 'bm-sariegos-internal-2024'
    }
})

const objServices = {
    createNotice: (noticeData) => api.post('/notice/', noticeData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    getNotices: () => api.get('/notice'),
    deleteNotice: (id) => api.delete(`/notice/${id}`)
}

export default objServices;