import axios from "axios";

const URL_API = 'https://back-bmsariegos-production.up.railway.app';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'x-api-key': 'bm-sariegos-internal-2024'
    }
})

const objServices = {
    createSponsor: (sponsorData) => api.post('/sponsor/', sponsorData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    getSponsors: () => api.get('/sponsor')
}

export default objServices;