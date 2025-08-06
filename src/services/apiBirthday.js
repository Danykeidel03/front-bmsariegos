import axios from "axios";

const URL_API = 'http://localhost:3005';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true
})

const objServices = {
    getBirthday: () => api.get('/birthday'),
    createBirthday: (formData) => api.post('/birthday', formData)
}

export default objServices;