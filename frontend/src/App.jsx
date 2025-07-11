import React from 'react';
import { Routes, Route } from 'react-router-dom';

// TESTE: componentes de placeholder
const LoginPage = () => <h1>Página de Login</h1>;
const RegisterPage = () => <h1>Página de Registo</h1>;
const ChatPage = () => <h1>Página Principal do Chat</h1>;

function App() {
    return (
        <Routes>
            {/* Garanta que esta linha está correta e que ChatPage é um componente válido */}
            <Route path="/" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
}

export default App;