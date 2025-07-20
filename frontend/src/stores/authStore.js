import { create } from 'zustand';
import apiClient from '../lib/apiClient';
import { ENDPOINTS } from '../utils/constants';

export const useAuthStore = create((set, get) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: true, // Inicia como true para a verificação inicial

    // Ação para buscar os dados do usuário se um token existir
    validateSession: async () => {
        const { token } = get();
        if (token) {
            try {
                const response = await apiClient.get(ENDPOINTS.AUTH.PROFILE);
                set({ user: response.data, isAuthenticated: true });
                return response.data; // Retorna os dados do usuário em caso de sucesso
            } catch (error) {
                console.error('Sessão inválida. Limpando token.', error);
                get().logout(); // Se o token for inválido, faz o logout
            } finally {
                set({ loading: false });
            }
        } else {
            set({ loading: false }); // Não há token, finaliza o carregamento
        }
    },

    // Ação de login
    login: async (credentials) => {
        const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
        const { token } = response.data;
        localStorage.setItem('token', token);
        set({ token, isAuthenticated: true });
        // Após o login, busca os dados do perfil para completar o estado
        await get().validateSession();
    },

    // Ação de logout
    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
    },

    // Ação de registro
    register: async (userData) => {
        await apiClient.post(ENDPOINTS.AUTH.REGISTER, userData);
        // Normalmente, após o registro, o usuário é redirecionado para a página de login
    },
}));