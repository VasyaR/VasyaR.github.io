import axios from "axios";
import { LocalStorage } from "../utils/localStorage";
import { RemoveUser } from "../providers/context";

const baseURL = "http://localhost:5000";

export const $api = axios.create({
    baseURL,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${LocalStorage.get('token')}`;
        return config;
    }
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        if (error.response && error.response.status && error.response.status === 401 && error.response !== undefined) {
            try {
                const originalRequest = error.config

                dispatch(RemoveUser())
                LocalStorage.remove('id')
                LocalStorage.remove('role')
                LocalStorage.remove('username')
                LocalStorage.remove('token') //must have
                LocalStorage.add('isAuth', false)

                return $api.request(originalRequest);
            } catch (error) {
                console.log(`Interceptors error ocurred - `, error);
            }
        }
        throw error;
    }
);
