import React, { useEffect, useState, useRef } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { chatService } from '../../services/chatService';
import { STOMP_SUBSCRIBE_TOPICS } from '../../utils/constants';
import Message from "./Message.jsx";
import {useNotifications} from "../../hooks/useNotifications.js";

/**
 * Busca, exibe e atualiza a lista de mensagens para um chat selecionado.
 * @param {{ chat: object }} props
 * @returns {JSX.Element}
 */
const MessageList = ({ chat }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { websocketService, isConnected } = useWebSocket();
    const { handleNewMessageReceived } = useNotifications();
    const messagesEndRef = useRef(null); // Referência para o final da lista

    /**
     * Função para fazer o scroll automático para a mensagem mais recente.
     */
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Efeito para fazer o scroll sempre que a lista de mensagens mudar.
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    /**
     * Efeito para buscar o histórico de mensagens quando um novo chat é selecionado.
     */
    useEffect(() => {
        if (!chat?.id) return;

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const messagePage = await chatService.getChatMessages(chat.id);
                setMessages(messagePage.content.reverse());
            } catch (error) {
                console.error("Falha ao buscar as mensagens:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [chat]);


    useEffect(() => {
        if (!chat?.id || !isConnected) return;
        const chatTopic = STOMP_SUBSCRIBE_TOPICS.CHAT(chat.id);

        const onNewMessage = (newMessage) => {
            // Delega a lógica de notificação para o nosso sistema centralizado
            handleNewMessageReceived(newMessage);

            setMessages(prevMessages => {
                if (prevMessages.find(msg => msg.id === newMessage.id)) {
                    return prevMessages;
                }
                return [...prevMessages, newMessage];
            });
        };

        const subscription = websocketService.subscribe(chatTopic, onNewMessage);
        return () => {
            websocketService.unsubscribe(subscription);
        };
    }, [chat, isConnected, websocketService, handleNewMessageReceived]);


    /**
     * Efeito para subscrever e cancelar a subscrição do tópico do WebSocket.
     * Este é o coração da nossa funcionalidade em tempo real.
     */
    useEffect(() => {
        // Só executa se tivermos um chat selecionado e a conexão WebSocket estiver ativa.
        if (!chat?.id || !isConnected) {
            return;
        }

        // Gera o tópico dinâmico para o chat atual.
        const chatTopic = STOMP_SUBSCRIBE_TOPICS.CHAT(chat.id);

        // A função de callback que será executada quando uma nova mensagem chegar.
        const onNewMessage = (newMessage) => {
            console.log('Nova mensagem recebida:', newMessage);
            // Adiciona a nova mensagem ao estado, garantindo que não há duplicados.
            setMessages(prevMessages => {
                if (prevMessages.find(msg => msg.id === newMessage.id)) {
                    return prevMessages;
                }
                return [...prevMessages, newMessage];
            });
        };

        // Usa o nosso serviço para se inscrever no tópico.
        const subscription = websocketService.subscribe(chatTopic, onNewMessage);
        console.log(`Subscrito no tópico: ${chatTopic}`);

        // A função de limpeza do useEffect: é executada quando o chat muda.
        return () => {
            console.log(`A cancelar subscrição do tópico: ${chatTopic}`);
            websocketService.unsubscribe(subscription);
        };
    }, [chat, isConnected, websocketService]); // Dependências do efeito


    return (
        <div className="flex flex-col h-full overflow-y-auto p-4">
            <div className="grid grid-cols-12 gap-y-2">
                {loading ? (
                    <p className="text-center text-white col-span-12">A carregar histórico...</p>
                ) : (
                    messages.map(msg => (
                        <Message key={msg.id} message={msg} />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default MessageList;
