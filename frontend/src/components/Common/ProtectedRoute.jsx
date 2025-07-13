import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * A guard component that checks for user authentication.
 * If the user is authenticated, it renders the child components.
 * Otherwise, it redirects the user to the welcome page.
 * @param {object} props
 * @param {React.ReactNode} props.children - The component to render if authenticated.
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // While the context is performing the initial token check, don't render anything.
    if (loading) {
        return null; // Or a loading spinner
    }

    // If not authenticated, redirect to the welcome page.
    if (!isAuthenticated) {
        return <Navigate to="/welcome" replace />;
    }

    // If authenticated, render the requested component.
    return children;
};

export default ProtectedRoute;