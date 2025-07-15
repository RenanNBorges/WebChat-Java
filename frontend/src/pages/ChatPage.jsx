import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import ChatList from '../components/Chat/ChatList.jsx';
import ChatRoom from '../components/Chat/ChatRoom.jsx';
import { chatService } from '../services/chatService';
import { useWebSocket } from '../hooks/useWebSocket';

const ChatPage = () => {
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isConnected } = useWebSocket();

    useEffect(() => {
        const fetchUserChats = async () => {
            if (user) {
                try {
                    setLoading(true);
                    // Agora, usamos o nosso serviço para buscar os dados reais!
                    const userChats = await chatService.getUserChats();
                    setChats(userChats);
                } catch (error) {
                    console.error("Falha ao buscar os chats", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserChats();
    }, [user]);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    return (

        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex items-center">
                <span className={`h-3 w-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>{isConnected ? 'Conectado' : 'A conectar...'}</span>
            </div>
            <div className="flex flex-row h-full w-full overflow-x-hidden">

                <ChatList
                    chats={chats}
                    selectedChat={selectedChat}
                    onSelectChat={handleSelectChat}
                    loading={loading}
                />

                <ChatRoom
                    selectedChat={selectedChat}
                />
            </div>
        </div>
    );
};

export default ChatPage;