import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import { WEBSOCKET_URL } from '../utils/constants';

export const useSocketStore = create((set, get) => ({
    stompClient: null,
    isConnected: false,

    connect: (token) => {
        // Previne múltiplas conexões
        if (get().stompClient?.active || !token) {
            return;
        }

        const client = new Client({
            brokerURL: WEBSOCKET_URL,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            reconnectDelay: 5000, // Tenta reconectar a cada 5 segundos
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,

            onConnect: () => {
                set({ isConnected: true, stompClient: client });
                console.log('STOMP: Conectado ao servidor WebSocket!');
            },
            onDisconnect: () => {
                set({ isConnected: false, stompClient: null });
                console.log('STOMP: Desconectado do servidor WebSocket.');
            },
            onStompError: (frame) => {
                console.error('STOMP: Erro no Broker:', frame.headers['message'], frame.body);
            },
        });

        client.activate();
    },

    disconnect: () => {
        get().stompClient?.deactivate();
    },
}));