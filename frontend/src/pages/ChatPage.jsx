import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatList from '../components/Chat/ChatList'; // TODO: Eu vou criar este componente a seguir.
import ChatRoom from '../components/Chat/ChatRoom'; // TODO: Eu vou criar este componente a seguir.
// import { chatService } from '../services/chatService'; // TODO: Eu vou criar este serviço.

/**
 * A página principal que contém a interface de chat.
 * Ela gere o layout e o estado principal, como a conversa selecionada.
 * @returns {JSX.Element}
 */
const ChatPage = () => {
    const { user } = useAuth(); // Obtém o utilizador autenticado
    const [chats, setChats] = useState([]); // Estado para armazenar a lista de conversas
    const [selectedChat, setSelectedChat] = useState(null); // Estado para a conversa ativa
    const [loading, setLoading] = useState(true);

    // Efeito para buscar as conversas do utilizador quando o componente é montado.
    useEffect(() => {
        const fetchChats = async () => {
            if (user) {
                try {
                    setLoading(true);
                    // TODO: Eu preciso de criar o chatService e o seu método getChats.
                    // const userChats = await chatService.getChats();
                    // setChats(userChats);

                    // Dados de placeholder por enquanto:
                    setChats([
                        { id: '1', name: 'Equipe 1', isGroup: true },
                        { id: '2', name: 'Pessoa 2', isGroup: false },
                        { id: '3', name: 'Equipe 2', isGroup: true },
                    ]);

                } catch (error) {
                    console.error("Failed to fetch chats", error);
                    // TODO: Eu vou adicionar uma notificação de erro para o utilizador.
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchChats();
    }, [user]); // A dependência [user] garante que isto corre quando o utilizador é autenticado.

    // Função para ser chamada pela ChatList quando um chat é selecionado.
    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                {/* Coluna da Lista de Chats (Sidebar) */}
                <ChatList
                    chats={chats}
                    selectedChat={selectedChat}
                    onSelectChat={handleSelectChat}
                    loading={loading}
                />

                {/* Coluna da Sala de Chat (Área Principal) */}
                <ChatRoom
                    selectedChat={selectedChat}
                />
            </div>
        </div>
    );
};

export default ChatPage;