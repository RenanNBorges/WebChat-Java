import { createContext } from 'react';

export const WebSocketContext = createContext(null);

/**
 * O Provedor que gere o estado da conexão WebSocket e expõe
 * as funções para controlar o seu ciclo de vida.
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
