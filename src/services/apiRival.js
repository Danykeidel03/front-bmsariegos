import axios from "axios";

const URL_API = 'https://back-bmsariegos-production.up.railway.app';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true
})

const objServices = {
    createRival: (rivalData) => api.post('/rival-team', rivalData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export default objServices;