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
    getTeams: () => api.get('/team'),
    createTeam: (teamData) => api.post('/team', teamData),
    deleteTeam: (teamId) => api.delete(`/team/${teamId}`),
    updateTeamName: (teamId, name) => api.put(`/team/${teamId}/name`, { name })
}

export default objServices;