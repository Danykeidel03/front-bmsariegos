import axios from "axios";

const URL_API = 'http://localhost:3005';

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
    withCredentials: true
})

const objServices = {
    loginUser: (userLoginData) => api.post('/user/login', userLoginData)
}

export default objServices;