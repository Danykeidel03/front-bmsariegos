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
    createImagenCabecera: (imagenData) => api.post('/imagenes-cabecera/', imagenData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
    getImagenesCabecera: () => api.get('/imagenes-cabecera/'),
    deleteImagenCabecera: (id) => api.delete(`/imagenes-cabecera/${id}`)
}

export default objServices;