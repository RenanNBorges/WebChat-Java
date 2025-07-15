/**
 * O baseURL da nossa API REST.
 * O proxy do Vite irá reencaminhar qualquer chamada que comece com /api.
 */
export const API_BASE_URL = '/api';

/**
 * A URL WebSocket.
 */
export const WEBSOCKET_URL = 'ws://localhost:8080/ws';

/**
 * Um objeto que contém todos os caminhos relativos dos nossos endpoints REST.
 */
export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    },
    USERS: {
        GET_PROFILE: '/users/me',
    },
    CHATS: {
        BASE: '/chats',
    },
    MESSAGES: {
        BY_CHAT: '/messages', // Ex: /api/messages?chatId=...
    }
};

// --- NOVAS CONSTANTES PARA A MILESTONE 6 ---

/**
 * Destinos do STOMP para onde o cliente envia mensagens (prefixo /app).
 */
export const STOMP_SEND_DESTINATIONS = {
    SEND_MESSAGE: '/app/chat.sendMessage',
    ADD_USER: '/app/chat.addUser',
    // TODO: Eu vou adicionar aqui o destino para os eventos de "a digitar...".
};

/**
 * Tópicos do STOMP que o cliente subscreve para receber mensagens.
 */
export const STOMP_SUBSCRIBE_TOPICS = {
    /**
     * O tópico público para eventos gerais (ex: utilizador entrou/saiu).
     */
    PUBLIC: '/topic/public',
    /**
     * Uma função que gera o caminho do tópico dinâmico para um chat específico.
     * @param {string} chatId - O ID do chat.
     * @returns {string} O caminho completo do tópico.
     */
    CHAT: (chatId) => `/topic/chat/${chatId}`,
    /**
     * Uma função que gera o caminho para receber mensagens privadas/notificações.
     * @param {string} userId - O ID do utilizador.
     * @returns {string} O caminho completo da fila do utilizador.
     */
    USER_QUEUE: (userId) => `/user/${userId}/queue/messages`,
};
