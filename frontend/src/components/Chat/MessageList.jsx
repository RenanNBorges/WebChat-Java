import React, { useState, useEffect } from 'react';
import { chatService } from '../../services/chatService';
import Message from './Message';

/**
 * Fetches and displays the list of messages for a given chat.
 * @param {object} props
 * @param {object} props.chat - The currently selected chat.
 * @returns {JSX.Element}
 */
const MessageList = ({ chat }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!chat?.id) return;

        const fetchMessages = async () => {
            setLoading(true);
            try {
                // Fetch the message history for the selected chat.
                const messagePage = await chatService.getChatMessages(chat.id);
                setMessages(messagePage.content.reverse()); // Reverse to show oldest first for correct order
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [chat]); // This effect re-runs whenever the selected 'chat' changes.

    return (
        <div className="flex flex-col h-full overflow-x-auto mb-4 p-4">
            <div className="grid grid-cols-12 gap-y-2">
                {loading ? (
                    <p className="text-center text-white col-span-12">A carregar mensagens...</p>
                ) : (
                    messages.map(msg => (
                        <Message key={msg.id} message={msg} />
                    ))
                )}
            </div>
        </div>
    );
};

export default MessageList;