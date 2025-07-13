import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatList from '../components/Chat/ChatList.jsx';
import ChatRoom from '../components/Chat/ChatRoom.jsx';
import { chatService } from '../services/chatService'; // Importar o novo serviço

const ChatPage = () => {
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [loading, setLoading] = useState(true);

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