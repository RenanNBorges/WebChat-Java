import React from 'react';
import { useAuth } from '../../hooks/useAuth.js';

/**
 * Renders a single chat message bubble.
 * It determines the message alignment based on whether the sender is the current user.
 * @param {object} props
 * @param {object} props.message - The message object to display.
 * @returns {JSX.Element}
 */
const Message = ({ message }) => {
    const { user } = useAuth();

    // Check if the message was sent by the currently logged-in user.
    const isSentByCurrentUser = message.sender.id === user.id;

    const messageClasses = isSentByCurrentUser
        ? 'col-start-6 col-end-13' // Sent messages align to the right
        : 'col-start-1 col-end-8'; // Received messages align to the left

    const bubbleClasses = isSentByCurrentUser
        ? 'bg-teal-custom text-gray bg-white' // Sent messages have a custom color
        : 'bg-white text-gray-700'; // Received messages have a white background

    return (
        <div className={`p-3 rounded-lg grid ${messageClasses}`}>
            <div className={`relative text-sm py-2 px-4 shadow rounded-xl ${bubbleClasses}`}>
                {!isSentByCurrentUser && (
                    <p className="font-bold text-teal-custom">{message.sender.username}</p>
                )}
                <div>{message.content}</div>
                <p className={`text-xs text-right mt-1 ${isSentByCurrentUser ? 'text-gray-300' : 'text-gray-400'}`}>
                    {/* TODO: I will format this timestamp with date-fns later. */}
                    {message.timestamp}
                </p>
            </div>
        </div>
    );
};

export default Message;