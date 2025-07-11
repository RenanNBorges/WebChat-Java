import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import apiClient from '../services/api';

/**
 * @type {React.Context<null|object>}
 * The authentication context object.
 */
export const AuthContext = createContext(null);

/**
 * Custom hook to consume the AuthContext easily from any component.
 * @returns {object} The authentication context value.
 */
export const useAuth = () => {
    return useContext(AuthContext);
};

/**
 * The provider component that wraps the application and manages all authentication state and logic.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    /**
     * Sets the authentication token in the application state, localStorage,
     * and the default headers for the API client.
     * @param {string|null} token - The JWT token, or null to clear it.
     */
    const setAuthToken = (token) => {
        if (token) {
            localStorage.setItem('token', token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete apiClient.defaults.headers.common['Authorization'];
        }
        setToken(token);
    };

    /**
     * Handles the user logout process by clearing state and storage.
     * Memoized with useCallback to prevent unnecessary re-renders.
     */
    const logout = useCallback(() => {
        setUser(null);
        setAuthToken(null);
        navigate('/login');
    }, [navigate]);

    /**
     * Validates the existing token on application load by fetching the user's profile.
     * If the token is invalid or expired, the user is logged out.
     * Memoized with useCallback for performance optimization.
     */
    const validateSession = useCallback(async () => {
        if (token) {
            try {
                // The interceptor will handle adding the token, but setting it here ensures it for the initial load.
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const userData = await authService.getProfile();
                setUser(userData);
            } catch (error) {
                console.error("Token validation failed:", error);
                logout();
            }
        }
        setLoading(false);
    }, [token, logout]);

    /**
     * Effect hook to run the session validation once on component mount.
     */
    useEffect(() => {
        validateSession();
    }, [validateSession]);

    /**
     * Handles the user login process by calling the API and managing state.
     * @param {object} credentials - The user's login credentials { username, password }.
     * @throws {Error} Throws an error if the login API call fails.
     */
    const login = async (credentials) => {
        try {
            const { token } = await authService.login(credentials);
            setAuthToken(token);
            navigate('/');
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    /**
     * The value object provided to all consuming components via the context.
     * It includes the authentication state and functions to manipulate it.
     */
    const value = {
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};