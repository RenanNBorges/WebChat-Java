import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { WebSocketContext } from './WebSocketContext.jsx';
import { AuthContext } from './AuthContext.jsx';

/**
 * O componente Provedor que gere toda a lógica de autenticação e
 * o ciclo de vida da conexão WebSocket.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const wsContext = useContext(WebSocketContext);

    const logout = useCallback(() => {
        if (wsContext) wsContext.disconnect();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        navigate('/login');
    }, [navigate, wsContext]);

    useEffect(() => {
        // ✅ CORREÇÃO: A função async é definida DENTRO do useEffect.
        const validateSession = async () => {
            if (token) {
                try {
                    const userData = await authService.getProfile();
                    setUser(userData);
                    if (wsContext) {
                        wsContext.connect(token);
                    }
                } catch (error) {
                    console.error("Token guardado é inválido. A fazer logout.", error);
                    logout();
                }
            }
            setLoading(false);
        };

        // E depois é chamada imediatamente. Isto resolve o aviso da "Promise ignorada".
        validateSession().then(r => console.log(r));

    }, [token, logout, wsContext]);

    const login = async (credentials) => {
        const { token: newToken, user: userData } = await authService.login(credentials);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setToken(newToken);
        if (wsContext) {
            wsContext.connect(newToken);
        }
        navigate('/');
    };

    const register = async (credentials) => {
        await authService.register(credentials);
        navigate('/login');
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};