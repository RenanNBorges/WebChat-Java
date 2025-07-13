import React from 'react';

/**
 * A barra lateral que exibe a lista de conversas do utilizador.
 * @param {object} props
 * @param {Array} props.chats - A lista de chats a ser exibida.
 * @returns {JSX.Element}
 */
const ChatList = ({ chats }) => {
    return (
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="font-bold text-2xl">Foot Chat</div>
            </div>
            <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold">Conversas</span>
                    <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{chats.length}</span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
                    {/* TODO: Eu vou mapear a lista de chats aqui para renderizar os ChatItems. */}
                    {chats.map(chat => (
                        <button key={chat.id} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                            <div className="ml-2 text-sm font-semibold">{chat.name}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;