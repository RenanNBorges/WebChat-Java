/**
 * O enum que define os diferentes tipos de eventos do WebSocket.
 * Exportamos isto para que outras partes da aplicação (como o MessageInput)
 * possam usá-lo para construir o payload da mensagem corretamente.
 */
export const MessageType = {
    CHAT: 'CHAT',
    JOIN: 'JOIN',
    LEAVE: 'LEAVE',
    TYPING: 'TYPING'
};
