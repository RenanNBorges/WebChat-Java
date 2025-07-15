import React from 'react';
import FieldBackground from './FieldBackground';
import ChatRoomHeader from './ChatRoomHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatRoom = ({ selectedChat }) => {
    if (!selectedChat) {
        return (
            <div className="flex flex-col flex-auto h-full p-6">
                <FieldBackground>
                    <div className="flex flex-col h-full items-center justify-center text-white">
                        <h2 className="text-2xl font-bold bg-black opacity-30 p-10 rounded-2xl">Bem-vindo ao Foot Chat!</h2>
                        <p className="text-lg text-gray-200 bg-black opacity-15 p-5 rounded-2xl">Selecione uma conversa para começar</p>
                    </div>
                </FieldBackground>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-auto h-full p-6">
            <FieldBackground>
                <div className="flex flex-col h-full">
                    <ChatRoomHeader chatName={selectedChat.name} />

                    <div className="flex-grow h-0 overflow-y-auto">
                        <MessageList chat={selectedChat} />
                    </div>

                    <div className="p-4">
                        <MessageInput selectedChat={selectedChat} />
                    </div>
                </div>
            </FieldBackground>
        </div>
    );
};

export default ChatRoom;