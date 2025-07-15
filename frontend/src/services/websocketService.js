import { Client } from '@stomp/stompjs';
import { WEBSOCKET_URL } from '../utils/constants';

/**
 * @class WebSocketService
 * A singleton class to manage the pure STOMP WebSocket connection.
 * Methods are defined as arrow functions to ensure 'this' is always correctly bound.
 */
class WebSocketService {
    stompClient;
    subscriptions = new Map();

    connect = (token, onConnected, onError) => {
        if (this.stompClient?.active) {
            return;
        }
        this.stompClient = new Client({
            brokerURL: WEBSOCKET_URL,
            connectHeaders: { Authorization: `Bearer ${token}` },
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            reconnectDelay: 5000,
            onConnect: (frame) => {
                console.log('STOMP: Conectado com sucesso!', frame);
                if (onConnected) onConnected(frame);
            },
            onStompError: (frame) => {
                console.error('STOMP: Erro no broker:', frame);
                if (onError) onError(frame);
            },
        });
        this.stompClient.activate();
    };

    disconnect = () => {
        if (this.stompClient?.active) {
            this.stompClient.deactivate();
            this.subscriptions.clear();
            console.log("STOMP: Desconectado.");
        }
    };

    subscribe = (topic, callback) => {
        if (!this.stompClient?.active) {
            console.error("Não é possível subscrever. O cliente não está conectado.");
            return;
        }

        const subscription = this.stompClient.subscribe(topic, (message) => {
            callback(JSON.parse(message.body));
        });

        this.subscriptions.set(topic, subscription);
        console.log(`Subscrito no tópico: ${topic}`);
        return subscription;
    };

    unsubscribe = (subscription) => {
        if (subscription) {
            subscription.unsubscribe();
        }
    };

    sendMessage = (destination, body) => {
        if (this.stompClient?.active) {
            this.stompClient.publish({
                destination: destination,
                body: JSON.stringify(body),
            });
        } else {
            console.error("Não é possível enviar a mensagem, o cliente STOMP não está ativo.");
        }
    };
}

const websocketService = new WebSocketService();
export default websocketService;