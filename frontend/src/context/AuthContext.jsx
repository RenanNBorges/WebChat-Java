import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { WebSocketContext } from './WebSocketContext';

/**
 * @type {React.Context<null|object>}
 * O objeto de contexto que irá partilhar o estado de autenticação.
 */
export const AuthContext = createContext(null);

/**
 * O componente Provedor que envolve a aplicação e gere toda a lógica de autenticação.
 * @param {object} props
 * @param {React.ReactNode} props.children - Os componentes filhos que serão renderizados.
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (e) {
            return null;
        }
    });

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const wsContext = useContext(WebSocketContext);

    /**
     * Gere o processo de logout, limpando o estado, o armazenamento e desconectando o WebSocket.
     */
    const logout = useCallback(() => {
        wsContext.disconnect();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        navigate('/login');
    }, [navigate, wsContext]);

    /**
     * Efeito para validar a sessão ao carregar a aplicação.
     */
    useEffect(() => {
        const validateSession = async () => {
            if (token) {
                try {
                    // A chamada getProfile valida o token no backend.
                    const userData = await authService.getProfile();
                    setUser(userData);
                    // Conecta o WebSocket APÓS a validação da sessão ser bem-sucedida.
                    wsContext.connect(token);
                } catch (error) {
                    console.error("Sessão inválida. A efetuar logout.", error);
                    logout();
                }
            }
            setLoading(false);
        };
        validateSession();
    }, [token, logout, wsContext]);

    /**
     * Gere o processo de login.
     * @param {object} credentials - As credenciais de login.
     */
    const login = async (credentials) => {
        // Assume-se que a API de login retorna um objeto com 'token' e 'user'.
        const { token: newToken, user: userData } = await authService.login(credentials);

        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData)); // Guardar como JSON.

        setUser(userData);
        setToken(newToken); // A atualização do token irá acionar o useEffect acima.

        navigate('/');
    };

    /**
     * Gere o processo de registo.
     * @param {object} credentials - Os dados de registo.
     */
    const register = async (credentials) => {
        await authService.register(credentials);
        // TODO: Eu irei adicionar aqui uma notificação de sucesso para o utilizador.
        navigate('/login');
    };

    /**
     * O objeto de valor a ser partilhado com os componentes consumidores.
     */
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