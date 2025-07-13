import React from 'react';
import {Link} from 'react-router-dom';
import AuthForm from './AuthForm.jsx';
import logo from '../../assets/images/logo.svg';
import Header from "../Common/Header.jsx";

/**
 * Renders the login page for the application, styled according to the design.
 * @returns {JSX.Element} The rendered login page.
 */
const LoginPage = () => {
    return (
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md mx-auto">

                <div className="text-center mb-8 space-x-20">
                    <div className="flex items-center justify-center mb-4">
                        <img src={logo} alt="Ícone de bola de futebol" className="h-20 w-20 mr-2"/>
                        <h2 className="text-5xl font-bold text-teal-custom text-[#38B4A0]">Lo<span
                            className="text-[#8AC0B8]">gin</span></h2>
                    </div>
                    <p className="text-gray-600">Volte a bater bola</p>
                </div>
                <AuthForm isRegisterForm={false}/>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Não tem conta?{' '}
                        <Link to="/register" className="text-teal-custom font-semibold hover:underline">
                            Registre-se
                        </Link>
                    </p>
                </div>
            </div>
    );
};

export default LoginPage;