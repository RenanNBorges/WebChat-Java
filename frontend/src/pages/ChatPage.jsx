import React, { useEffect } from 'react';
import { useChatStore } from '../stores/chatStore';
import ChatList from '../features/chat/components/ChatList';
import ChatRoom from '../features/chat/components/ChatRoom';

/**
 * A página principal do chat, que monta a interface lado a lado.
 */
const ChatPage = () => {
    const fetchChats = useChatStore((state) => state.fetchChats);

    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    return (
        // Container principal que ocupa toda a tela
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                {/* A barra lateral com a lista de chats */}
                <ChatList />
                {/* A sala de chat principal, que ocupa o restante do espaço */}
                <ChatRoom />
            </div>
        </div>
    );
};

export default ChatPage;