import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import Spinner from '../UI/Spinner';

/**
 * Protege uma rota, permitindo o acesso apenas a utilizadores autenticados.
 * Enquanto verifica a autenticação, exibe um spinner.
 * Se não estiver autenticado, redireciona para a página de boas-vindas.
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuthStore();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redireciona para a página de boas-vindas, guardando a localização
        // para que o utilizador possa ser redirecionado de volta após o login.
        return <Navigate to="/welcome" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;