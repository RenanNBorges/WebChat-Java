import React from 'react';

/**
 * Renderiza um único item na lista de conversas.
 * @param {object} props
 * @param {object} props.chat - O objeto do chat a ser exibido.
 * @param {boolean} props.isSelected - Se o chat está atualmente selecionado.
 * @param {Function} props.onSelect - A função a ser chamada quando o chat é clicado.
 * @returns {JSX.Element}
 */
const ChatItem = ({ chat, isSelected, onSelect }) => {
    const activeClasses = isSelected ? 'bg-gray-200' : 'hover:bg-gray-100';

    return (
        <button
            onClick={() => onSelect(chat)}
            className={`flex flex-row items-center w-full rounded-xl p-2 transition-colors duration-150 ${activeClasses}`}
        >
            <div className="flex items-center justify-center h-10 w-10 bg-indigo-200 rounded-full">
                {/* TODO: Eu vou adicionar um avatar ou a primeira letra do nome do chat/utilizador aqui. */}
                {chat.name[0]}
            </div>
            <div className="ml-2 text-sm font-semibold text-left">
                <p>{chat.name}</p>
                {/* <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p> */}
            </div>
        </button>
    );
};

export default ChatItem;