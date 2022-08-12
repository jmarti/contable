import axios from "axios"
import authService from "../services/auth.service"

export const publicAxios = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const authAxios = axios.create()

authAxios.interceptors.request.use(
    async config => {
        config = {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${await authService.getGAuthToken()}`
            }
        }
        return config
    },
    error => Promise.reject(error),
)