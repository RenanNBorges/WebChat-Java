import apiClient from './api';
import { ENDPOINTS } from '../utils/constants';

/**
 * Encapsula todas as chamadas de API relacionadas com chats e mensagens.
 */
export const chatService = {
    /**
     * Busca a lista de todos os chats para o utilizador autenticado.
     */
    getUserChats: async () => {
        try {
            const response = await apiClient.get(ENDPOINTS.CHATS.BASE);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar os chats do utilizador:", error);
            throw error;
        }
    },

    /**
     * Busca o histórico de mensagens para um chat específico com paginação.
     */
    getChatMessages: async (chatId, page = 0, size = 50) => {
        try {
            // ✅ CORREÇÃO: Usar a constante correta do endpoint de mensagens.
            // O caminho correto é ENDPOINTS.MESSAGES.BY_CHAT, que corresponde a '/messages'.
            const response = await apiClient.get(ENDPOINTS.MESSAGES.BY_CHAT, {
                params: { chatId, page, size }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar as mensagens do chat:", error);
            throw error;
        }
    }
};