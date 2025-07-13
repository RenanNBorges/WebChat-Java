import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-white.svg';
import backgroundImage from '../assets/images/background.webp';

/**
 * Renders the public landing page for unauthenticated users.
 * @returns {JSX.Element}
 */
const WelcomePage = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 text-white"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})` }}
        >
            <img className="text-green-font" src={logo} alt="Foot Chat Logo" className="w-24 h-24 mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold">Foot Chat</h1>
            <p className="mt-4 text-xl md:text-2xl text-center max-w-2xl">
                A sua plataforma para discutir táticas, celebrar vitórias e conectar-se com outros fãs de futebol.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                    to="/login"
                    className="bg-teal-custom text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-[#42A393] transition-colors"
                >
                    Entrar
                </Link>
                <Link
                    to="/register"
                    className="bg-[#73C2A9] text-teal-custom font-bold py-3 px-8 rounded-lg text-lg hover:bg-[#42A393] transition-colors"
                >
                    Registar
                </Link>
            </div>
        </div>
    );
};

export default WelcomePage;