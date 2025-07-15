import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useWebSocket } from '../../hooks/useWebSocket';
import { chatService } from '../../services/chatService';
import { STOMP_SUBSCRIBE_TOPICS } from '../../utils/constants';

/**
 * Renderiza uma única bolha de mensagem de chat.
 * Determina o alinhamento e o estilo com base no remetente.
 * @param {{ message: object }} props
 * @returns {JSX.Element}
 */
const Message = ({ message }) => {
    const { user } = useAuth();

    // Verifica se a mensagem foi enviada pelo utilizador atualmente logado.
    const isSentByCurrentUser = message.sender.id === user.id;

    const messageContainerClasses = isSentByCurrentUser
        ? 'col-start-6 col-end-13 p-3 rounded-lg' // Mensagens enviadas alinham à direita
        : 'col-start-1 col-end-8 p-3 rounded-lg'; // Mensagens recebidas alinham à esquerda

    const messageBubbleClasses = isSentByCurrentUser
        ? 'bg-teal-custom text-white' // Cor para mensagens enviadas
        : 'bg-white text-gray-600'; // Cor para mensagens recebidas

    return (
        <div className={messageContainerClasses}>
            <div className={`flex items-start ${isSentByCurrentUser ? 'justify-end flex-row-reverse' : 'flex-row'}`}>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white font-bold">
                    {message.sender.username.charAt(0).toUpperCase()}
                </div>
                <div className={`relative mx-3 text-sm py-2 px-4 shadow rounded-xl ${messageBubbleClasses}`}>
                    {!isSentByCurrentUser && (
                        <p className="font-bold text-teal-custom">{message.sender.username}</p>
                    )}
                    <p className="text-base break-words">{message.content}</p>
                    <p className={`text-xs text-right mt-1 ${isSentByCurrentUser ? 'text-gray-300' : 'text-gray-400'}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
        </div>
    );
};

/**
 * Busca, exibe e atualiza a lista de mensagens para um chat selecionado.
 * @param {{ chat: object }} props
 * @returns {JSX.Element}
 */
const MessageList = ({ chat }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { websocketService, isConnected } = useWebSocket();
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
