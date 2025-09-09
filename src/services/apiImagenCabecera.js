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
    createImagenCabecera: (imagenData) => api.post('/imagenes-cabecera/', imagenData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    getImagenesCabecera: () => api.get('/imagenes-cabecera/'),
    deleteImagenCabecera: (id) => api.delete(`/imagenes-cabecera/${id}`)
}

export default objServices;