import apiClient from './api';
import { ENDPOINTS } from '../utils/constants'; // 1. Importar os nossos endpoints

export const authService = {
    register: async (userData) => {
        const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
        return response.data;
    },

    getProfile: async () => {
        const response = await apiClient.get(ENDPOINTS.USERS.GET_PROFILE);
        return response.data;
    },
};