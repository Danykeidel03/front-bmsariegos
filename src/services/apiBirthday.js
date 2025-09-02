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
    getBirthday: () => api.get('/getA'),
    createBirthday: (formData) => api.post('/birthday', formData),
    updateBirthday: (id, formData) => api.put(`/birthday/${id}`, formData)
}

export default objServices;