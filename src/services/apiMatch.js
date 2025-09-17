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
    getAllMatches: () => api.get('/match'),
    createMatch: (matchData) => api.post('/match', matchData),
    updateMatch: (matchId, matchUpdate) => api.put(`/match/${matchId}`, matchUpdate),
    updateMatchDateTime: (matchId, dateTimeData) => api.put(`/match/${matchId}/datetime`, dateTimeData),
    deleteMatch: (matchId) => api.delete(`/match/${matchId}`)
}

export default objServices;