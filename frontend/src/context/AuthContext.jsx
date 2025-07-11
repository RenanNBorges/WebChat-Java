import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // TODO setToken
            setUser({username: 'Logado'}); // simulation
        }
        setLoading(false);
    }, [token]);

    const login = async (userData, userToken) => {
        localStorage.setItem("token", userToken);
        setToken(userToken);
        setUser(userData);

        //TODO Use React Router
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);

        //TODO Use React Router
    };

    const value = {
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>)
        ;
};