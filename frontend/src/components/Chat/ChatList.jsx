import React from 'react';
import ChatItem from './ChatItem';

/**
 * A barra lateral que exibe a lista de conversas do utilizador.
 * @param {object} props
 * @param {Array} props.chats - A lista de chats a ser exibida.
 * @param {object} props.selectedChat - O chat atualmente selecionado.
 * @param {Function} props.onSelectChat - A função para selecionar um novo chat.
 * @param {boolean} props.loading - O estado de carregamento.
 * @returns {JSX.Element}
 */
const ChatList = ({ chats, selectedChat, onSelectChat, loading }) => {
    return (
        <div className="flex flex-col py-8 pl-6 pr-2 w-full md:w-80 bg-white flex-shrink-0 border-r border-gray-200">
            <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="font-bold text-2xl">Foot Chat</div>
            </div>

            {/* TODO: Eu vou implementar a barra de pesquisa aqui. */}

            <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold">Conversas</span>
                    <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                        {chats.length}
                    </span>
                </div>

                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
                    {loading ? (
                        <p className="text-center text-gray-500">A carregar conversas...</p>
                    ) : (
                        chats.map(chat => (
                            <ChatItem
                                key={chat.id}
                                chat={chat}
                                isSelected={selectedChat?.id === chat.id}
                                onSelect={onSelectChat}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatList;