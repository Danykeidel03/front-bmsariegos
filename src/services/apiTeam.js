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
    getTeams: () => api.get('/team'),
    createTeam: (teamData) => api.post('/team', teamData),
    deleteTeam: (teamId) => api.delete(`/team/${teamId}`),
    updateTeamName: (teamId, name) => api.put(`/team/${teamId}/name`, { name }),
    reorderTeams: (teamOrders) => api.put('/team/reorder', { teamOrders })
}

export default objServices;