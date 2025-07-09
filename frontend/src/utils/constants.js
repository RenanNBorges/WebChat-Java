export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
export const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';

export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh'
    },
    USERS: {
        PROFILE: '/users/profile',
        SEARCH: '/users/search',
        STATUS: '/users/status'
    },
    CHATS: {
        LIST: '/chats',
        CREATE: '/chats',
        MESSAGES: '/chats/:id/messages'
    }
};

export const WS_TOPICS = {
    CHAT_MESSAGE: '/topic/chat',
    USER_STATUS: '/topic/user-status',
    TYPING: '/topic/typing'
};

export const CHAT_TYPES = {
    PRIVATE: 'PRIVATE',
    GROUP: 'GROUP'
};

export const MESSAGE_TYPES = {
    TEXT: 'TEXT',
    IMAGE: 'IMAGE',
    FILE: 'FILE',
    SYSTEM: 'SYSTEM'
};

export const USER_STATUS = {
    ONLINE: 'ONLINE',
    OFFLINE: 'OFFLINE',
    AWAY: 'AWAY'
};