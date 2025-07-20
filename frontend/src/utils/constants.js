// A URL base para a conexão WebSocket.
// O Vite irá usar o proxy configurado em vite.config.js durante o desenvolvimento.
// Em produção, esta URL pode precisar ser absoluta (ex: wss://seu-dominio.com/ws).
export const WEBSOCKET_URL = import.meta.env.DEV
    ? `ws://${window.location.host}/ws`
    : 'wss://SUA_URL_DE_PRODUCAO/ws'; // TODO: Substituir pela URL de produção

// A URL base para a nossa API REST.
// O proxy do Vite cuida disso em desenvolvimento.
export const API_BASE_URL = '/api';

// Endpoints da API REST para manter o código limpo e organizado.
export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        PROFILE: '/users/me',
    },
    CHATS: {
        BASE: '/chats', // Para buscar a lista de chats
        MESSAGES: '/messages', // Para buscar mensagens de um chat (ex: /messages?chatId=...)
    },
};

// Destinos STOMP para onde o cliente ENVIA mensagens.
export const STOMP_SEND_DESTINATIONS = {
    SEND_MESSAGE: '/app/chat.sendMessage',
    ADD_USER: '/app/chat.addUser',
    // Futuramente: '/app/chat.typing'
};

// Tópicos STOMP que o cliente SUBSCREVE para RECEBER mensagens.
export const STOMP_SUBSCRIBE_TOPICS = {
    // Função que gera o tópico dinâmico para um chat específico.
    CHAT: (chatId) => `/topic/chat/${chatId}`,
    // Futuramente para notificações privadas:
    // USER_QUEUE: (userId) => `/user/${userId}/queue/notifications`,
};