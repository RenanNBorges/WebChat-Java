import apiClient from './api';

/**
 * The authService object encapsulates all authentication-related API calls.
 */
export const authService = {
    /**
     * Sends a login request to the API.
     * @param {object} credentials - The user's credentials { username, password }.
     * @returns {Promise<object>} A promise that resolves to the login response data (e.g., { token }).
     */
    login: async  (credentials) => {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    /**
     * Sends a registration request to the API.
     * @param {object} userData - The new user's data { username, email, password }.
     * @returns {Promise<object>} A promise that resolves to the new user's data.
     */
    register: async (userData) => {
        try {
            const response = await apiClient.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    /**
     * Fetches the profile of the currently authenticated user.
     * This requires a valid JWT to be sent in the headers.
     * @returns {Promise<object>} A promise that resolves to the user's profile data.
     */
    getProfile: async () => {
        //TODO work only with JWT Interceptor
        try {
            const response = await apiClient.get('/users/me');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}