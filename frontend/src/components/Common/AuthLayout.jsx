import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Assumindo que o Header está em Common
import backgroundImage from '../../assets/images/background.webp';

const AuthLayout = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Header />
            <main className="flex items-center justify-center py-12 px-4 pt-40">
                {/* A Outlet renderiza o componente da rota filha (Login ou Register) */}
                <Outlet />
            </main>
        </div>
    );
};

export default AuthLayout;