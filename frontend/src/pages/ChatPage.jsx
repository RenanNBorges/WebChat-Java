import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// TODO: Eu irei criar estes componentes e o serviço nos próximos passos.
// import ChatList from '../components/Chat/ChatList.jsx';
// import ChatRoom from '../components/Chat/ChatRoom.jsx';
// import { chatService } from '../services/chatService';

/**
 * A página principal que contém a interface de chat completa.
 * É responsável por gerir o seu próprio layout de ecrã inteiro e por
 * orquestrar os dados entre a lista de chats e a sala de chat ativa.
 * @returns {JSX.Element}
 */
const ChatPage = () => {
    /**
     * O estado que armazena a lista de todas as conversas do utilizador.
     * @type {[Array, Function]}
     */
    const [chats, setChats] = useState([]);

    /**
     * O estado que armazena o objeto da conversa atualmente selecionada.
     * @type {[object|null, Function]}
     */
    const [selectedChat, setSelectedChat] = useState(null);

    /**
     * O estado que controla a visibilidade dos indicadores de carregamento.
     * @type {[boolean, Function]}
     */
    const [loading, setLoading] = useState(true);

    /**
     * O hook que nos dá acesso aos dados do utilizador autenticado.
     */
    const { user } = useAuth();

    /**
     * Efeito que é executado uma vez quando o componente é montado
     * para buscar a lista de conversas do utilizador a partir da API.
     */
    useEffect(() => {
        const fetchUserChats = async () => {
            if (user) {
                try {
                    setLoading(true);
                    // TODO: Eu preciso de criar o chatService e o seu método getChats para substituir estes dados.
                    // const userChats = await chatService.getChats();
                    // setChats(userChats);

                    // Dados de placeholder para visualização e desenvolvimento:
                    const mockChats = [
                        { id: '1', name: 'Equipe 1', isGroup: true, lastMessage: 'Vamos ganhar!' },
                        { id: '2', name: 'Pessoa 2', isGroup: false, lastMessage: 'Tudo pronto para o jogo?' },
                        { id: '3', name: 'Equipe 2', isGroup: true, lastMessage: 'Qual é a tática?' },
                        { id: '4', name: 'Pessoa 4', isGroup: false, lastMessage: 'Ok, até já.' },
                    ];
                    setChats(mockChats);

                } catch (error) {
                    console.error("Failed to fetch chats", error);
                    // TODO: Eu irei adicionar uma notificação de erro para o utilizador.
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserChats();
    }, [user]); // A dependência [user] garante que a busca só acontece quando temos um utilizador.

    /**
     * Uma função de callback para ser passada ao ChatList.
     * Ela atualiza o estado da conversa selecionada quando um utilizador clica num item da lista.
     * @param {object} chat - O objeto do chat que foi selecionado.
     */
    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                {/* TODO: Eu irei substituir este placeholder pelo componente ChatList real. */}
                <div className="w-1/4 bg-white border-r border-gray-200">
                    <p className="p-4">Componente ChatList</p>
                    <ul>
                        {chats.map(chat => (
                            <li key={chat.id} onClick={() => handleSelectChat(chat)} className="p-4 hover:bg-gray-100 cursor-pointer">
                                {chat.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* TODO: Eu irei substituir este placeholder pelo componente ChatRoom real. */}
                <div className="w-3/4 flex flex-col">
                    {selectedChat ? (
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{selectedChat.name}</h2>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Selecione uma conversa para começar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;