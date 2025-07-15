import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useWebSocket } from '../../hooks/useWebSocket';
import { MessageType } from '../../websocket/ChatMessage';
import './MessageInput.css';
import btnBall from '../../assets/images/btn-ball.svg';
import { STOMP_SEND_DESTINATIONS } from '../../utils/constants';

/**
 * Renderiza o formulário de input, agora com a lógica completa para enviar mensagens.
 * @param {{ selectedChat: object }} props
 * @returns {JSX.Element}
 */
const MessageInput = ({ selectedChat }) => {
    const [content, setContent] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const { user } = useAuth(); // Obtém o utilizador autenticado
    const { websocketService, isConnected } = useWebSocket(); // Obtém o nosso serviço de WebSocket

    /**
     * Handles the form submission to send a new message.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        // Valida se há conteúdo e se a conexão está ativa
        if (content.trim() === '' || isAnimating || !isConnected || !selectedChat) {
            return;
        }

        // TODO: Eu preciso de construir o DTO ChatMessage a ser enviado.
        const chatMessagePayload = {
            type: MessageType.CHAT,
            content: content,
            senderId: user.id,
            senderUsername: user.username,
            chatId: selectedChat.id,
            // O status será definido pelo backend
        };

        // TODO: Eu preciso de usar o websocketService para enviar a mensagem.
        websocketService.sendMessage(
            STOMP_SEND_DESTINATIONS.SEND_MESSAGE,
            chatMessagePayload
        );

        // Inicia a animação e limpa o estado
        setIsAnimating(true);
        setTimeout(() => {
            setContent('');
            setIsAnimating(false);
        }, 400);
    };

    return (
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div className="flex-grow">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        placeholder={isConnected ? "Escreva a sua mensagem..." : "A conectar..."}
                        disabled={!isConnected}
                    />
                </form>
            </div>
            <div className="ml-4">
                <button
                    onClick={handleSubmit}
                    className="focus:outline-none"
                    disabled={isAnimating || !isConnected || content.trim() === ''}
                >
                    <img
                        src={btnBall}
                        alt="Enviar Mensagem"
                        className={`w-10 h-10 transition-transform duration-150 ease-in-out transform hover:scale-110 ${
                            isAnimating ? 'animate-roll-out' : 'animate-zoom-in'
                        }`}
                    />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;