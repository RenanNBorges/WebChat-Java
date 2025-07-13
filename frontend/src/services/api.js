import axios from 'axios';
import { API_BASE_URL } from '../utils/constants'; // 1. Importar a nossa constante

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor de requisição para adicionar automaticamente o token JWT.
 * TODO: Eu vou implementar a lógica para ler o token do localStorage
 * e adicioná-lo ao cabeçalho de todas as requisições protegidas.
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;