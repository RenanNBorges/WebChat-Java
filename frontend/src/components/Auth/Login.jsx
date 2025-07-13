import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm.jsx';
import logo from '../../assets/images/logo.svg';
import backgroundImage from '../../assets/images/background.webp';

/**
 * Renders the login page for the application, styled according to the design.
 * @returns {JSX.Element} The rendered login page.
 */
const LoginPage = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <header className="bg-[#F5FFFF] ">
                <div className="container mx-15">
                    <h1 className="text-5xl font-bold text-green-font">Foot <span className="text-[#AEEDE9]">Chat</span></h1>
                </div>
            </header>

            <main className="w-full flex items-center justify-center p-4 mt-30">
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md mx-auto">

                    <div className="text-center mb-8 space-x-20">
                        <div className="flex items-center justify-center mb-4">
                            <img src={logo} alt="Ícone de bola de futebol" className="h-20 w-20 mr-2" />
                            <h2 className="text-5xl font-bold text-teal-custom text-[#38B4A0]">Lo<span className="text-[#8AC0B8]">gin</span></h2>
                        </div>
                        <p className="text-gray-600">Volte a bater bola</p>
                    </div>

                    {/*
                      * Here we render our reusable AuthForm component.
                      * By passing 'isRegisterForm={false}', we tell the component to:
                      * 1. Hide the username, confirm password, and terms fields.
                      * 2. Call the 'login' function on submit.
                      * 3. Set the button text to 'Entrar'.
                    */}
                    <AuthForm isRegisterForm={false} />

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Não tem conta?{' '}
                            <Link to="/register" className="text-teal-custom font-semibold hover:underline">
                                Registre-se
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;