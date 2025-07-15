import { useContext } from 'react';
import { WebSocketContext } from '../context/WebSocketContext';

/**
 * Hook customizado para aceder facilmente ao WebSocketContext.
 * @returns {object} O valor do contexto do WebSocket.
 * @throws {Error} Se o hook for usado fora de um WebSocketProvider.
 */
export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined || context === null) {
        throw new Error('useWebSocket deve ser usado dentro de um WebSocketProvider');
    }
    return context;
};