import React, {useState, useEffect, useCallback} from "react";
import {notificationService} from "../services/notificationService.js";
import {useAuth} from "../hooks/useAuth.js";
import {NotificationContext} from "./NotificationContext.jsx";


export const NotificationProvider = ({children}) => {
    const [unreadCount, setUnreadCount] = useState(0);
    const {user} = useAuth();

    useEffect(() => {
        notificationService.requestPermission()
    }, []);

    useEffect(() => {
        notificationService.requestPermission();
    }, []);

    useEffect(() => {
        const handleFocus = () => {
            if (unreadCount > 0) {
                setUnreadCount(0);
            }
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);

    }, [unreadCount]);

    const handleNewMessageReceived = useCallback((newMessage) => {
        if (document.hidden && newMessage.sender.id !== user?.id) {
            setUnreadCount(prevCount => prevCount + 1);
            notificationService.showNotification(
                `Nova Mensage de ${newMessage.sender.username}`,
                {
                    body: newMessage.content,
                    icon: '',
                }
            );
        }
    }, [user]);

    const value = {
        unreadCount,
        handleNewMessageReceived,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}