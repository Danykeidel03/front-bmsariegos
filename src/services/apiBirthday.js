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
    getBirthday: () => api.get('/birthday'),
    getAllPlayers: () => api.get('/birthday/getAllbirthday'),
    createBirthday: (formData) => api.post('/birthday', formData),
    updateBirthday: (id, formData) => api.put(`/birthday/${id}`, formData),
    deleteBirthday: (id) => api.delete(`/birthday/${id}`)
}

export default objServices;