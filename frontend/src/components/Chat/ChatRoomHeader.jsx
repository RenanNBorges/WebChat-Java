import React from 'react';

/**
 * Renders the header for the active chat room, displaying the chat name.
 * @param {object} props
 * @param {string} props.chatName - The name of the currently selected chat.
 * @returns {JSX.Element}
 */
const ChatRoomHeader = ({ chatName }) => {
    return (
        <div className="flex sm:items-center justify-between py-3 px-4 border-b-2 border-gray-200 bg-[#97E9E5] bg-opacity-10 rounded-t-lg">
            <div className="relative flex items-center space-x-4">
                <div className="relative">
                    {/* TODO: I will add the chat avatar here. */}<span className="absolute text-green-500 right-0 bottom-0">
                        <svg width="20" height="20">
                            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                        </svg>
                    </span>
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex flex-col leading-tight">
                    <div className="text-xl font-semibold mt-1 flex items-center">
                        <span className="text-white mr-3">{chatName}</span>
                    </div>
                    <span className="text-sm text-gray-200">Online</span>
                </div>
            </div>
            {/* TODO: I will add action buttons here (e.g., video call, info). */}
        </div>
    );
};

export default ChatRoomHeader;