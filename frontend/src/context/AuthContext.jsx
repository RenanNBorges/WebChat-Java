import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

/**
 * @type {React.Context<null|object>}
 * O objeto de contexto que irá partilhar o estado de autenticação.
 */
export const AuthContext = createContext(null);

/**
 * Hook customizado para consumir o AuthContext de forma mais limpa.
 * @returns {object}
 */
export const useAuth = () => {
    return useContext(AuthContext);
};

/**
 * O componente Provedor que envolve a aplicação e gere toda a lógica de autenticação.
 * @param {object} props
 * @param {React.ReactNode} props.children - Os componentes filhos que serão renderizados.
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const validateSession = async () => {
            if (token) {
                try {
                    const userData = await authService.getProfile();
                    setUser(userData);
                } catch (error) {
                    console.error("A sessão falhou ou o token é inválido.", error);
                    logout();
                }
            }
            setLoading(false);
        };

        validateSession();
    }, [token, logout]);

    const login = async (credentials) => {
        const { token } = await authService.login(credentials);
        localStorage.setItem('token', token);
        setToken(token); // A atualização do token irá acionar o useEffect para buscar o perfil.
        navigate('/');
    };

    const register = async (credentials) => {
        await authService.register(credentials);
        // TODO: Eu irei adicionar uma notificação de sucesso aqui.
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