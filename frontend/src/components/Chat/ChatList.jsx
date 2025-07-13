import React, { useState, useMemo } from 'react';
import ChatItem from './ChatItem';

/**
 * A barra lateral que exibe a lista de conversas do utilizador, separada por abas.
 * @param {object} props
 * @param {Array} props.chats - A lista de todos os chats.
 * @param {object} props.selectedChat - O chat atualmente selecionado.
 * @param {Function} props.onSelectChat - A função para selecionar um novo chat.
 * @param {boolean} props.loading - O estado de carregamento.
 * @returns {JSX.Element}
 */
const ChatList = ({ chats, selectedChat, onSelectChat, loading }) => {
    // 1. Estado para controlar a aba ativa. O padrão é 'vestiario'.
    const [activeTab, setActiveTab] = useState('vestiario');

    // 2. Usamos 'useMemo' para filtrar as listas de chat de forma otimizada.
    // Este cálculo só será refeito se a lista principal de 'chats' mudar.
    const { privateChats, groupChats } = useMemo(() => {
        const privateChats = chats.filter(chat => !chat.group);
        const groupChats = chats.filter(chat => chat.group);
        return { privateChats, groupChats };
    }, [chats]);

    // 3. Determina qual lista de chats deve ser exibida com base na aba ativa.
    const displayedChats = activeTab === 'vestiario' ? privateChats : groupChats;

    // Funções para estilizar as abas ativas/inativas
    const getTabClasses = (tabName) => {
        const isActive = activeTab === tabName;
        return isActive
            ? 'border-b-2 border-teal-custom text-teal-custom'
            : 'text-gray-400';
    };

    return (
        <div className="flex flex-col py-4 px-4 w-full md:w-80 bg-white flex-shrink-0 border-r border-gray-200">
            {/* TODO: Eu vou adicionar aqui o cabeçalho 'Foot Chat' se for necessário no layout final */}

            {/* 4. As abas clicáveis */}
            <div className="flex flex-row items-center border-b-2 border-gray-200">
                <button
                    onClick={() => setActiveTab('vestiario')}
                    className={`flex-1 text-center font-bold py-2 transition-colors ${getTabClasses('vestiario')}`}
                >
                    Vestiário
                </button>
                <button
                    onClick={() => setActiveTab('equipes')}
                    className={`flex-1 text-center font-bold py-2 transition-colors ${getTabClasses('equipes')}`}
                >
                    Equipes
                </button>
            </div>

            <div className="flex flex-col mt-4 flex-grow h-0 overflow-y-auto">
                {loading ? (
                    <p className="text-center text-gray-500 mt-4">A carregar conversas...</p>
                ) : (
                    displayedChats.map(chat => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            isSelected={selectedChat?.id === chat.id}
                            onSelect={onSelectChat}
                        />
                    ))
                )}
                {/* Mostra uma mensagem se uma aba estiver vazia */}
                {!loading && displayedChats.length === 0 && (
                    <p className="text-center text-gray-400 mt-4 text-sm">
                        Nenhuma conversa nesta aba.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChatList;