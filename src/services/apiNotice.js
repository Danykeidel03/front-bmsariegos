import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 5000;

const api = axios.create({
    baseURL: URL_API,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
        'x-api-key': API_KEY
    }
})

const objServices = {
    createNotice: (noticeData) => api.post('/notice/', noticeData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    getNotices: () => api.get('/notice'),
    getAllNotices: () => api.get('/notice/getAll'),
    deleteNotice: (id) => api.delete(`/notice/${id}`)
}

export default objServices;