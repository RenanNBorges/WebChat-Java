import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Stores
import { useAuthStore } from './stores/authStore';
import { useSocketStore } from './stores/socketStore';
import { useChatStore } from './stores/chatStore';

// Roteamento e Layouts
import ProtectedRoute from './components/Common/ProtectedRoute';
import AuthLayout from './features/auth/components/AuthLayout';

// Páginas
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import { STOMP_SUBSCRIBE_TOPICS } from './utils/constants';

function App() {
    const { token, isAuthenticated, validateSession } = useAuthStore();
    const { connect, disconnect, isConnected, stompClient } = useSocketStore();
    const { selectedChat, addMessage } = useChatStore();
    const navigate = useNavigate(); // Hook para controlar a navegação

    // Efeito 1: Validar a sessão quando a aplicação carrega.
    useEffect(() => {
        validateSession();
    }, [validateSession]);

    // Efeito 2: Gerir a conexão WebSocket com base na autenticação.
    useEffect(() => {
        if (isAuthenticated && token) {
            connect(token);
        } else {
            disconnect();
        }
    }, [isAuthenticated, token, connect, disconnect]);

    // Efeito 3: Gerir a subscrição ao tópico do chat selecionado.
    useEffect(() => {
        if (isConnected && stompClient && selectedChat) {
            const topic = STOMP_SUBSCRIBE_TOPICS.CHAT(selectedChat.id);

            const subscription = stompClient.subscribe(topic, (message) => {
                const newMessage = JSON.parse(message.body);
                addMessage(newMessage);
            });
            console.log(`✅ Subscrito no tópico: ${topic}`);

            return () => {
                subscription.unsubscribe();
                console.log(`🔌 Subscrição cancelada do tópico: ${topic}`);
            };
        }
    }, [isConnected, stompClient, selectedChat, addMessage]);

        useEffect(() => {
        // Se o utilizador estiver autenticado, navega para a página principal do chat.
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Routes>
            {/* Rota pública */}
            <Route path="/welcome" element={<WelcomePage />} />

            {/* Rotas de Autenticação com layout próprio */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Rota Principal Protegida */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;