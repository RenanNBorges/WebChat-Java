/**
 * O baseURL da nossa API.
 * O proxy do Vite irá reencaminhar qualquer chamada que comece com /api.
 */
export const API_BASE_URL = '/api';

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
        MESSAGES: '/messages',
    }
};

/**
 * Constantes para os tópicos do WebSocket.
 * TODO: Eu vou usar isto a partir da Milestone 6.
 */
export const WS_TOPICS = {
    CHAT_MESSAGE: '/topic/chat',

};
