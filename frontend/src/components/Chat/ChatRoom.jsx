import React from 'react';

/**
 * A área principal que exibe a conversa ativa.
 * @param {object} props
 * @param {object} props.selectedChat - O objeto do chat que foi selecionado.
 * @returns {JSX.Element}
 */
const ChatRoom = ({ selectedChat }) => {
    // Se nenhum chat estiver selecionado, exibe uma mensagem de boas-vindas.
    if (!selectedChat) {
        return (
            <div className="flex flex-col flex-auto h-full p-6">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 items-center justify-center">
                    <p className="text-xl text-gray-500">Selecione uma conversa para começar</p>
                    <p className="text-sm text-gray-400">Pode escolher uma "Equipe" ou um colega no "Vestiário".</p>
                </div>
            </div>
        );
    }

    // Se um chat estiver selecionado, exibe o seu nome.
    return (
        <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                {/* TODO: Eu vou substituir isto pelo ChatRoomHeader, MessageList, e MessageInput. */}
                <div className="text-center font-bold text-xl">
                    {selectedChat.name}
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;