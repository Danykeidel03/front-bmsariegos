const API_BASE_URL = 'https://back-bmsariegos-production.up.railway.app';

const apiClasificaciones = {
    setupClasificaciones: async () => {
        const response = await fetch(`${API_BASE_URL}/setup/clasificaciones`, {
            method: 'POST'
        });
        return response.json();
    },

    getClasificaciones: async () => {
        const response = await fetch(`${API_BASE_URL}/api/clasificaciones`);
        return response.json();
    }
};

export default apiClasificaciones;