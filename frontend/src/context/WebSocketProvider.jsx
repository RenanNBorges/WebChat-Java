import {useCallback, useState} from "react";
import websocketService from "../services/websocketService.js";
import { WebSocketContext } from "./WebSocketContext";

export const WebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);

    /**
     * Inicia a conexão com o servidor WebSocket.
     * Esta função agora é chamada explicitamente pelo AuthContext.
     * @param {string} token - O token JWT para autenticação.
     */
    const connect = useCallback((token) => {
        if (websocketService.stompClient?.active || !token) {
            return;
        }

        console.log("A iniciar conexão WebSocket a pedido...");
        websocketService.connect(
            token,
            () => {
                console.log("Conexão WebSocket estabelecida com sucesso.");
                setIsConnected(true);
            },
            (error) => {
                console.error("Falha na conexão WebSocket:", error);
                setIsConnected(false);
            }
        );
    }, []);

    /**
     * Encerra a conexão WebSocket.
     * Esta função agora é chamada explicitamente pelo AuthContext.
     */
    const disconnect = useCallback(() => {
        if (websocketService.stompClient?.active) {
            console.log("A desconectar do WebSocket a pedido...");
            websocketService.disconnect();
            setIsConnected(false);
        }
    }, []);

    const value = {
        isConnected,
        connect,
        disconnect,
        websocketService,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};